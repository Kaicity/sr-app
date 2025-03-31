export const configDb1 = {
  user: process.env.DB_USER_1!,
  password: process.env.DB_PASSWORD_1!,
  server: process.env.DB_SERVER_1!,
  database: process.env.DB_DATABASE_1!,
  options: { encrypt: false, trustServerCertificate: true },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 60000,
};

export const configDb2 = {
  user: process.env.DB_USER_2!,
  password: process.env.DB_PASSWORD_2!,
  server: process.env.DB_SERVER_2!,
  database: process.env.DB_DATABASE_2!,
  options: { encrypt: false, trustServerCertificate: true },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 60000,
};

export const configDb3 = {
  user: process.env.DB_USER_3!,
  password: process.env.DB_PASSWORD_3!,
  server: process.env.DB_SERVER_3!,
  database: process.env.DB_DATABASE_3!,
  options: { encrypt: false, trustServerCertificate: true },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 60000,
};
