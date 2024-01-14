import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Promo } from '@prisma/client';
import PromosDto from './promos.dto';
import { UNSUCCESS_PROMO_UPDATE } from '../common/constants';
import { generateWebPFromOtherImageFormat } from '../common/utils';

@Injectable()
export class PromosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(): Promise<number> {
    return this.prisma.promo
      .create({
        data: {
          title: '',
          description: '',
          image: '',
        },
      })
      .then((newPromo) => newPromo.id);
  }

  async getById(id: number): Promise<Promo> {
    return this.prisma.promo.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<Promo[]> {
    return this.prisma.promo.findMany();
  }

  async update(id: number, dto: PromosDto): Promise<Promo | null> {
    const updatedPromo = this.getById(id);
    if (!updatedPromo) {
      throw new NotFoundException(UNSUCCESS_PROMO_UPDATE);
    }
    if (dto.image) {
      dto.image = await generateWebPFromOtherImageFormat(dto.image);
    }
    return this.prisma.promo.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: number): Promise<boolean | null> {
    const deletedPromo = this.getById(id);
    if (!deletedPromo) {
      throw new NotFoundException(UNSUCCESS_PROMO_UPDATE);
    }
    return !!this.prisma.promo.delete({
      where: {
        id,
      },
    });
  }
}
