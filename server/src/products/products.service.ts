import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { PRODUCT_NOT_FOUND } from '../common/constants';
import { SearchProductDto } from './products.dto';
import { SearchType } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(): Promise<number> {
    return this.prismaService.product
      .create({
        data: {
          title: '',
          slug: '',
          description: '',
          count: 0,
          images: [],
          price: 0,
          attributes: {},
        },
      })
      .then((newProduct) => newProduct.id);
  }

  async getById(id: number): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: object): Promise<Product | null> {
    const updatedProduct = await this.getById(id);
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: { ...dto },
    });
  }

  async delete(id: number): Promise<boolean | null> {
    const deletedProduct = await this.getById(id);
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return !!this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { slug },
    });
  }

  async index(searchDto: SearchProductDto): Promise<Product[]> {
    const { searchType, searchString, take, attributes, categoryId, page } =
      searchDto;
    const searchHashMap = {
      [SearchType.ALL_ITEMS]: () =>
        this.prismaService.product.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            ],
            price: { gt: 0 },
          },
          orderBy: {
            saleSize: 'asc',
            createdAt: 'asc',
          },
          take,
          skip: (page - 1) * take,
        }),
      [SearchType.SIMILAR_ITEMS]: () =>
        this.prismaService.product.findMany({
          where: {
            categoryId,
            count: { gt: 0 },
            price: { gt: 0 },
          },
          take,
          orderBy: {
            saleSize: 'asc',
            createdAt: 'asc',
          },
        }),
      [SearchType.LAST_ITEMS]: () =>
        this.prismaService.product.findMany({
          where: {
            count: { gt: 0 },
            price: { gt: 0 },
          },
          orderBy: {
            saleSize: 'asc',
            createdAt: 'asc',
          },
          take,
        }),
      [SearchType.CATEGORY_ITEMS]: () =>
        this.prismaService.product.findMany({
          where: {
            categoryId,
            count: { gt: 0 },
            price: { gt: 0 },
          },
          orderBy: {
            saleSize: 'asc',
            createdAt: 'asc',
          },
          take,
        }),
      [SearchType.CATEGORY_FILTERED_ITEMS]: () =>
        this.prismaService.product.findMany({
          where: {
            categoryId,
            price: { gt: 0 },
          },
        }),
    };
    return this.prismaService.product.findMany();
  }
}
