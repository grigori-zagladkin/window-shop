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
import { AttributesService } from './attributes.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import AttributeDto from './attribute.dto';
import { Attribute } from '@prisma/client';

@ApiTags()
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Auth()
  @ApiResponse({})
  @ApiOperation({})
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post(':categoryId')
  async create(@Param('categoryId') categoryId: string): Promise<number> {
    return await this.attributesService.create(+categoryId);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @Get()
  async findAll(): Promise<Attribute[]> {
    return this.attributesService.findAll();
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Attribute | null> {
    return this.attributesService.findById(+id);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: AttributeDto,
  ): Promise<Attribute | null> {
    return await this.attributesService.update(+id, dto);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({})
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean | null> {
    return await this.attributesService.delete(+id);
  }

  @ApiResponse({})
  @ApiOperation({})
  @Get('category/:categoryId')
  async findAllByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Attribute[]> {
    return await this.attributesService.findByCategory(+categoryId);
  }
}
