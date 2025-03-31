import sql from 'mssql';

export async function connectToDB(config: any): Promise<sql.ConnectionPool> {
  try {
    const pool = await sql.connect(config);
    console.log('Kết nối SQL Server thành công!', config.database);
    return pool;
  } catch (err) {
    console.error('Lỗi kết nối SQL Server:', err);
    throw err;
  }
}
