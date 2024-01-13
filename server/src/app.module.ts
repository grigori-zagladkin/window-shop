import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CategoriesModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
