import { ISearchProductParams, SearchType } from './product.interface';

export default class ProductDto {}

export class SearchProductDto implements ISearchProductParams {
  attributes?: { [p: string]: string };
  categoryId?: number;
  page?: number;
  searchString?: string;
  searchType: SearchType;
  take?: number;
}
