import type { Product } from './product';
import type { SalesOrderHeader } from './sale-order-header';

export interface SalesOrderDetail {
  salesOrderId: SalesOrderHeader;
  salesOrderDetailId: number;
  carrierTrackingNumber?: string | null;
  orderQty: number;
  product: Product;
  specialOfferId: number;
  unitPrice: number;
  unitPriceDiscount: number;
  lineTotal: number;
  rowguid: string;
  modifiedDate: Date;
}
