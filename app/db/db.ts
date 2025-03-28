import sql, { ConnectionPool } from 'mssql'; // Import sql and ConnectionPool from 'mssql'

// Define the configuration object with appropriate types
const sqlConfig = {
  user: 'sa', // Type assertion to string
  password: '123',
  database: 'AdventureWorks2022',
  server: 'DESKTOP-T1J8PD9\\MSSQLSERVER01',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 300000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Asynchronous function to establish the connection and return a pool
export async function getDbPool(): Promise<ConnectionPool> {
  try {
    // Establish connection with the database using sqlConfig
    const conn = process.env.CONN as string;
    const pool = await sql.connect(conn); // Returns a connection pool
    console.log('Connected to SQL Server');
    return pool; // Return the connection pool
  } catch (err) {
    console.error('Database connection error:', err); // Log connection error
    throw err; // Rethrow the error for further handling
  }
}

export default getDbPool;
