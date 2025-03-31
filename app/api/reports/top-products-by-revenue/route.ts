'use server';

import sql from 'mssql';
import { connectToDB } from '@/app/db/db';
import { configDb2 } from '@/app/db/config';

export async function getTopProducts(year?: string | null) {
  try {
    const pool = await connectToDB(configDb2);

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

    return {
      Year: year,
      TopProducts: result.recordset,
    };
  } catch (error: any) {
    console.error('Lỗi truy vấn dữ liệu:', error);
    throw new Error('Lỗi truy vấn dữ liệu');
  }
}
