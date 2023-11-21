// implement ORM
import * as path from 'path';
import { DataSource } from 'typeorm';

export const WriteDatabaseProvider = new DataSource({
  type: 'postgres',
  port: 5431,
  maxQueryExecutionTime: 5000,
  uuidExtension: 'uuid-ossp',

  host: '127.0.0.1',
  username: 'dbwrite',
  password: '7XugK4rBzjolP9S',
  database: 'dbwrite',
  // host: process.env.DB_HOST_WRITE,
  // username: process.env.DB_USER_WRITE,
  // password: process.env.DB_PASS_WRITE,
  // database: process.env.DB_NAME_WRITE,

  migrationsRun: true,

  migrationsTransactionMode: 'none',
  synchronize: false,
  migrations: [`${path.join(__dirname, 'migrations/*{.ts,.js}')}`],
  entities: [`${path.join(__dirname, 'entities/*{.ts,.js}')}`]
});

export const ReadDatabaseProvider = new DataSource({
  type: 'postgres',
  port: 5430,
  maxQueryExecutionTime: 5000,
  uuidExtension: 'uuid-ossp',

  host: '127.0.0.1',
  username: 'dbread',
  password: '7XugK4rBzjolP9S',
  database: 'dbread',
  // host: process.env.DB_HOST_READ,
  // username: process.env.DB_USER_READ,
  // password: process.env.DB_PASS_READ,
  // database: process.env.DB_NAME_READ,

  migrationsRun: true,

  migrationsTransactionMode: 'none',
  synchronize: false,
  migrations: [`${path.join(__dirname, 'migrations/*{.ts,.js}')}`],
  entities: [`${path.join(__dirname, 'entities/*{.ts,.js}')}`]
});
