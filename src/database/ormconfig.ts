import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Campaign } from '../campaigns/entities/campaign.entity';

dotenv.config({ path: './vars/.development.env' });
interface DataSourceOptions {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: any;
  migrations: string[];
  seeds: [];
  synchronize: boolean;
  logging: boolean;
}

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Campaign],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  seeds: [],
  synchronize: process.env.SYNCHRONIZE == 'TRUE' ? true : false,
  logging: process.env.LOGGING == 'TRUE' ? true : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
