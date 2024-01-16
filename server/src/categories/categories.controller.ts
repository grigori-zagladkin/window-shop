import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UsePipes,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { Auth } from '../auth/auth.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: '2XX' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post()
  async create(): Promise<number> {
    return await this.categoriesService.create();
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.categoriesService.getBySlug(slug);
  }

  @Auth()
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: HttpStatus.OK })
  @Put()
  async update() {}

  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoriesService.delete(+id);
  }
}
