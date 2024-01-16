import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { AttributesModule } from './attributes/attributes.module';
import { PromosModule } from './promos/promos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    AuthModule,
    AttributesModule,
    PromosModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
