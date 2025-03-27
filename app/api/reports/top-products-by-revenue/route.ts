import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import { getDbPool } from '@/app/db/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get('year');

    const pool = await getDbPool();

    // Truy vấn top 10 sản phẩm có doanh thu cao nhất
    let query = `
      SELECT TOP 10 
        p.Name AS ProductName,
        SUM(sod.LineTotal) AS TotalRevenue
      FROM SalesOrderDetail sod
      JOIN Product p ON sod.ProductID = p.ProductID
      JOIN SalesOrderHeader soh ON sod.SalesOrderID = soh.SalesOrderID
      ${year ? 'WHERE YEAR(soh.OrderDate) = @year' : ''}
      GROUP BY p.Name
      ORDER BY TotalRevenue DESC;
    `;

    const result = await pool
      .request()
      .input('year', sql.Int, year ? parseInt(year) : null)
      .query(query);

    return NextResponse.json({
      Year: year,
      TopProducts: result.recordset,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Lỗi truy vấn dữ liệu', details: error.message }, { status: 500 });
  }
}
