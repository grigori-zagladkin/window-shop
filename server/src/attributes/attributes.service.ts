import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import AttributeDto from './attribute.dto';
import { Attribute } from '@prisma/client';
import { ATTRIBUTE_NOT_FOUND } from '../common/constants';

@Injectable()
export class AttributesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(categoryId: number): Promise<number> {
    return this.prismaService.attribute
      .create({
        data: {
          title: '',
          suggestVariants: [],
          categoryId,
        },
      })
      .then((res) => res.id);
  }

  async findById(id: number): Promise<Attribute | null> {
    const attribute = this.prismaService.attribute.findUnique({
      where: {
        id,
      },
    });
    if (!attribute) {
      throw new NotFoundException(ATTRIBUTE_NOT_FOUND);
    }
    return attribute;
  }

  async findByCategory(categoryId: number): Promise<Attribute[]> {
    return this.prismaService.attribute.findMany({
      where: {
        categoryId,
      },
    });
  }

  async findAll(): Promise<Attribute[]> {
    return this.prismaService.attribute.findMany();
  }

  async update(id: number, dto: AttributeDto): Promise<Attribute | null> {
    if (await this.findById(id)) {
      return this.prismaService.attribute.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
    }
  }

  async delete(id: number): Promise<boolean | null> {
    if (await this.findById(id)) {
      return !!this.prismaService.attribute.delete({
        where: {
          id,
        },
      });
    }
  }
}
