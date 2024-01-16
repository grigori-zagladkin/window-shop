export enum SearchType {
  LAST_ITEMS = 'last_items',
  SIMILAR_ITEMS = 'similar_items',
  CATEGORY_ITEMS = 'category_items',
  CATEGORY_FILTERED_ITEMS = 'category_filtered_items',
  ALL_ITEMS = 'all_items',
}

export interface ISearchProductParams {
  searchType: SearchType;
  page?: number;
  take?: number;
  searchString?: string;
  categoryId?: number;
  attributes?: {
    [attributeName: string]: string;
  };
}
