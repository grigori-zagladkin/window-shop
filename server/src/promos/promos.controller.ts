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
import { Auth } from '../auth/auth.decorator';

@ApiTags('Акции')
@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({})
  @Post()
  async create(): Promise<number> {
    return this.promosService.create();
  }

  @ApiResponse({})
  @ApiOperation({})
  @Get()
  async findAll(): Promise<Promo[]> {
    return this.promosService.getAll();
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.promosService.getById(+id);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: PromosDto,
  ): Promise<Promo | null> {
    return this.promosService.update(+id, dto);
  }

  @Auth()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({})
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean | null> {
    return this.promosService.delete(+id);
  }
}
