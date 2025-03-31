'use server';

import sql from 'mssql';
import { connectToDB } from '@/app/db/db';
import { configDb1, configDb2, configDb3 } from '@/app/db/config';

export async function getSalesData(year?: string | null) {
  try {
    const poolsv2 = await connectToDB(configDb2);

    const poolsv1 = await connectToDB(configDb1);

    // Tính tổng doanh số theo năm hoặc tổng tất cả nếu year = null
    let totalSalesQuery = `
      SELECT SUM(TotalDue) AS TotalSales
      FROM [SalesNA].[Sales].[SalesOrderHeader]
      ${year ? 'WHERE YEAR(OrderDate) = @year' : ''}
    `;

    const totalSalesResult = await poolsv2
      .request()
      .input('year', sql.Int, year ? parseInt(year) : null)
      .query(totalSalesQuery);

    const totalSales = totalSalesResult.recordset[0]?.TotalSales || 0;

    // Tính phần trăm doanh số theo danh mục
    let salesQuery = `
      SELECT pc.Name AS Category,
            SUM(sod.LineTotal) AS TotalSales,
            CASE 
                WHEN @totalSales > 0 THEN (SUM(sod.LineTotal) / @totalSales) * 100
                ELSE 0
            END AS SalesPercentage
      FROM SalesOrderDetail sod
      JOIN Product p ON sod.ProductID = p.ProductID
      JOIN ProductSubcategory ps ON p.ProductSubcategoryID = ps.ProductSubcategoryID
      JOIN ProductCategory pc ON ps.ProductCategoryID = pc.ProductCategoryID
      JOIN SalesOrderHeader soh ON sod.SalesOrderID = soh.SalesOrderID
      ${year ? 'WHERE YEAR(soh.OrderDate) = @year' : ''}
      GROUP BY pc.Name
      ORDER BY pc.Name;
    `;

    const salesResult = await poolsv2
      .request()
      .input('year', sql.Int, year ? parseInt(year) : null)
      .input('totalSales', sql.Float, totalSales)
      .query(salesQuery);

    return {
      Year: year,
      Data: salesResult.recordset,
    };
  } catch (error: any) {
    console.error('Lỗi truy vấn dữ liệu:', error);
    throw new Error('Lỗi truy vấn dữ liệu');
  }
}
