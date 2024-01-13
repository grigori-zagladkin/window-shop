import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    Put,
    ValidationPipe,
    UsePipes
} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Category} from "@prisma/client";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @ApiOperation({summary: "2XX"})
    @ApiResponse({status: HttpStatus.CREATED})
    @Post()
    async create(): Promise<number> {
        return await this.categoriesService.create();
    }

    @ApiOperation({summary: ''})
    @ApiResponse({status: HttpStatus.OK})
    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoriesService.getAll();
    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: ''})
    @ApiResponse({status: HttpStatus.OK})
    @Get(':slug')
    async getBySlug(@Param('slug') slug: string) {
        return await this.categoriesService.getBySlug(slug)
    }

    @ApiOperation({ summary: '' })
    @ApiResponse({ status: HttpStatus.OK })
    @Put()
    async update() {

    }

    @ApiOperation({ summary: '' })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.categoriesService.delete(+id);
    }
}
