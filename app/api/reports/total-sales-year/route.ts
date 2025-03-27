import { getDbPool } from '@/app/db/db';
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get('year');

    const pool = await getDbPool();

    // Truy vấn tổng doanh thu trong năm
    let query = `
      SELECT SUM(TotalDue) AS TotalSales
      FROM SalesOrderHeader
      ${year ? 'WHERE YEAR(OrderDate) = @year' : ''};
    `;

    const result = await pool
      .request()
      .input('year', sql.Int, year ? parseInt(year) : null)
      .query(query);

    return NextResponse.json({
      Year: year,
      TotalSales: result.recordset[0].TotalSales || 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Lỗi truy vấn dữ liệu', details: error.message }, { status: 500 });
  }
}
