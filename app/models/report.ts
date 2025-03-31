export interface TopProduct {
  ProductName: string;
  TotalRevenue: number;
}

export interface SubcategorySales {
  Category: string;
  TotalSales: number;
  SalesPercentage: number;
}

export interface ToTalSalesByYear {
  Year: string;
  TotalSales: number;
}

export interface SaleProductPercent {
  Category: string;
  TotalSales: number;
  SalesPercentage: number;
}
