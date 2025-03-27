import { NextRequest, NextResponse } from 'next/server';

import sql from 'mssql';
import { getDbPool } from '@/app/db/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get('year');

    const pool = await getDbPool();

    // Tính tổng doanh số theo năm hoặc tổng tất cả nếu year = null
    let totalSalesQuery = `
      SELECT SUM(TotalDue) AS TotalSales
      FROM SalesOrderHeader
      ${year ? 'WHERE YEAR(OrderDate) = @year' : ''}
    `;
    const totalSalesResult = await pool
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

    const salesResult = await pool
      .request()
      .input('year', sql.Int, year ? parseInt(year) : null)
      .input('totalSales', sql.Float, totalSales)
      .query(salesQuery);

    return NextResponse.json({
      Year: year,
      Data: salesResult.recordset,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Lỗi truy vấn dữ liệu', details: error.message }, { status: 500 });
  }
}
