import type { ProductCategory } from './product-category';
import type { ProductSubcategory } from './product-sub-category';

export interface Product {
  productId: number;
  name: string;
  productNumber: string;
  makeFlag: boolean;
  finishedGoodsFlag: boolean;
  color?: string;
  safetyStockLevel: number;
  reorderPoint: number;
  standardCost: number;
  listPrice: number;
  size?: string;
  sizeUnitMeasureCode?: string;
  weightUnitMeasureCode?: string;
  weight?: number;
  daysToManufacture: number;
  productLine?: string;
  class?: string;
  style?: string;
  productSubcategory?: ProductSubcategory;
  productModel?: ProductCategory;
  sellStartDate: Date;
  sellEndDate?: Date;
  discontinuedDate?: Date;
  rowguid: string;
  modifiedDate: Date;
}

export interface TopProductResponse {
  Year: string;
  ExecutionTimeMs: number;
  products: Product[];
}
