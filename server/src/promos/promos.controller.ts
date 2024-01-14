import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { PromosService } from './promos.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Promo } from '@prisma/client';
import PromosDto from './promos.dto';

@ApiTags('Акции')
@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({})
  async create(): Promise<number> {
    return this.promosService.create();
  }

  @Get()
  async findAll(): Promise<Promo[]> {
    return this.promosService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.promosService.getById(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: PromosDto) {
    return this.promosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promosService.delete(+id);
  }
}
