import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CategoryDto from './category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(): Promise<number> {
    return this.prisma.category
      .create({
        data: {
          title: '',
          slug: '',
          description: '',
          image: '',
        },
      })
      .then((data) => data.id);
  }

  async getAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async getBySlug(slug: string): Promise<Category | void> {
    return this.prisma.category.findUniqueOrThrow();
  }

  async getById(id: number): Promise<Category | void> {
    return this.prisma.category.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: CategoryDto): Promise<Category | void> {
    const candidate = await this.getById(id);
    if (candidate) {
      return this.prisma.category.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
    }
  }

  async delete(id: number): Promise<boolean | void> {
    const candidate = await this.getById(id);
    if (candidate) {
      return this.prisma.category
        .delete({
          where: {
            id,
          },
        })
        .then((res) => true);
    }
  }
}
