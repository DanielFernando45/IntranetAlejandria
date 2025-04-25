import { DataSource } from 'typeorm';
import { ENTITIES } from 'src/entities';
import * as path from 'path';
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '../../.env') }); // Ajusta la ruta si es necesario

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ENTITIES,
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // muy importante en producción
});