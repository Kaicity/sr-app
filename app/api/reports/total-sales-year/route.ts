'use server';

import sql from 'mssql';
import { configDb2 } from '@/app/db/config';
import { connectToDB } from '@/app/db/db';

export async function getTotalSales(year?: string | null) {
  try {
    const pool = await connectToDB(configDb2);

    let query = `
      SELECT SUM(TotalDue) AS TotalSales
      FROM SalesOrderHeader
      ${year ? 'WHERE YEAR(OrderDate) = @year' : ''};
    `;

    const result = await pool
      .request()
      .input('year', sql.Int, year ? parseInt(year) : null)
      .query(query);

    return {
      Year: year,
      TotalSales: result.recordset[0]?.TotalSales || 0,
    };
  } catch (error: any) {
    console.error('Lỗi truy vấn dữ liệu:', error);
    throw new Error('Lỗi truy vấn dữ liệu');
  }
}
