import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import { getDbPool } from '@/app/db/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get('year');

    const pool = await getDbPool();

    // Truy vấn doanh thu theo thành phố và danh mục
    let query = `
      WITH SalesByCityCategory AS (
        SELECT 
          a.City,
          pc.Name AS Category,
          SUM(sod.LineTotal) AS TotalRevenue
        FROM SalesOrderDetail sod
        JOIN SalesOrderHeader soh ON sod.SalesOrderID = soh.SalesOrderID
        JOIN Product p ON sod.ProductID = p.ProductID
        JOIN ProductSubcategory ps ON p.ProductSubcategoryID = ps.ProductSubcategoryID
        JOIN ProductCategory pc ON ps.ProductCategoryID = pc.ProductCategoryID
        JOIN Address a ON soh.ShipToAddressID = a.AddressID
        ${year ? 'WHERE YEAR(soh.OrderDate) = @year' : ''}
        GROUP BY a.City, pc.Name
      ),
      TopCities AS (
        SELECT TOP 10 City
        FROM SalesByCityCategory
        GROUP BY City
        ORDER BY SUM(TotalRevenue) DESC
      )
      SELECT s.City, s.Category, s.TotalRevenue
      FROM SalesByCityCategory s
      WHERE s.City IN (SELECT City FROM TopCities)
      ORDER BY s.City, s.Category;
    `;

    const result = await pool
      .request()
      .input('year', sql.Int, year ? parseInt(year) : null)
      .query(query);

    return NextResponse.json({
      Year: year,
      SalesData: result.recordset,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Lỗi truy vấn dữ liệu', details: error.message }, { status: 500 });
  }
}
