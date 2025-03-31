export interface SalesOrder {
  SalesOrderID: number;
  RevisionNumber: number;
  OrderDate: string;
  CustomerID: number;
  TotalDue: number;
  Status: number;
  ModifiedDate: string;
}

interface SalesOrderDetail {
  CustomerID: number;
  CustomerName: string;
  OrderDate: string;
  ProductID: number;
  ProductName: string;
  OrderQty: number;
  UnitPrice: number;
  LineTotal: number;
  TotalDue: number;
  Status: number;
}
