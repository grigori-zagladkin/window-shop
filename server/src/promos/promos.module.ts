import { Module } from '@nestjs/common';
import { PromosService } from './promos.service';
import { PromosController } from './promos.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PromosController],
  providers: [PromosService, PrismaService],
})
export class PromosModule {}
