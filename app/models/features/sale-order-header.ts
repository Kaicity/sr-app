export interface SalesOrderHeader {
  salesOrderId: number;
  revisionNumber: number;
  orderDate: Date;
  dueDate: Date;
  shipDate?: Date | null;
  status: number;
  onlineOrderFlag: boolean;
  salesOrderNumber: string;
  purchaseOrderNumber?: string | null;
  accountNumber?: string | null;
  customerId: number;
  salesPersonId?: number | null;
  territoryId?: number | null;
  billToAddressId: number;
  shipToAddressId: number;
  shipMethodId: number;
  creditCardId?: number | null;
  creditCardApprovalCode?: string | null;
  currencyRateId?: number | null;
  subTotal: number;
  taxAmt: number;
  freight: number;
  totalDue: number;
  rowguid: string;
  modifiedDate: Date;
}
