import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import * as db from '../models';
import { PRODUCTION } from '../config'
import { valueToBoolean } from '../utils/common';
// import { ISequelizeOptions } from './interfaceConfig';

export interface ISequelizeOptions {
  timezone: string;
  benchmark: boolean;
  logging: boolean;
  host: string | undefined;
  dialect: Dialect,
  port: number;
  schema: string | undefined;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}
export const SSL_DB = process.env.SSL_DB === 'true' ? true : false;
if (
  !valueToBoolean(process.env.DB_HOST) ||
  !valueToBoolean(process.env.DB_USERNAME) ||
  !valueToBoolean(process.env.DB_PASSWORD) ||
  !valueToBoolean(process.env.DB) ||
  !valueToBoolean(process.env.DB_PORT)
) {
  console.error('Database connection Details are missing!');
}
export const DATABASE = {
  HOST: valueToBoolean(process.env.DB_HOST) ? process.env.DB_HOST : '',
  USERNAME: valueToBoolean(process.env.DB_USERNAME)
    ? process.env.DB_USERNAME
    : '',
  PASSWORD: valueToBoolean(process.env.DB_PASSWORD)
    ? process.env.DB_PASSWORD
    : '',
  DBNAME: valueToBoolean(process.env.DB) ? process.env.DB : '',
  PORT: Number(process.env.DB_PORT),
  SCHEMA: process.env.DB_SCHEMA
};

const sequelizeOptions: ISequelizeOptions = {
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  dialect: 'postgres',
  timezone: '+05:30',
  benchmark: true,
  logging: process.env.NODE_ENV !== PRODUCTION,
  schema: DATABASE.SCHEMA
};

if (valueToBoolean(SSL_DB)) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

// const sequelize = new Sequelize(DATABASE_URL!, sequelizeOptions);
const sequelize = new Sequelize(DATABASE.DBNAME!,
  DATABASE.USERNAME!,
  DATABASE.PASSWORD,
  sequelizeOptions);
sequelize.addModels(Object.values(db));

export { sequelize };
