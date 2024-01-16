import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { Product } from '@prisma/client';
import ProductDto, { SearchProductDto } from './products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @Post()
  async create(): Promise<number> {
    return this.productsService.create();
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.getById(+id);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean | null> {
    return this.productsService.delete(+id);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: ProductDto,
  ): Promise<Product | null> {
    return this.productsService.update(+id, dto);
  }

  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string): Promise<Product | null> {
    return this.productsService.getBySlug(slug);
  }

  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Post('index')
  async index(@Body() dto: SearchProductDto): Promise<Product[]> {
    return this.productsService.index(dto);
  }
}
