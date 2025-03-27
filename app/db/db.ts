import sql from 'mssql';

const dbConfig = {
  server: process.env.NEXT_PUBLIC_DB_SERVER as string,
  database: process.env.NEXT_PUBLIC_DB_DATABASE as string,
  user: process.env.NEXT_PUBLIC_DB_USER as string,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD as string,
  port: parseInt(process.env.NEXT_PUBLIC_DB_PORT || '1433', 10),
  options: {
    encrypt: process.env.NEXT_PUBLIC_DB_ENCRYPT === 'true', // Bắt buộc khi kết nối Azure
    trustServerCertificate: true, // Nếu dùng localhost, cần bật
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getDbPool() {
  if (!dbConfig.server) {
    throw new Error('Database config "server" is required and must be a string.');
  }

  if (!pool) {
    try {
      pool = await sql.connect(dbConfig);
      console.log('Connected to SQL Server');
    } catch (err) {
      console.error('Database connection error:', err);
      throw err;
    }
  }
  return pool;
}
