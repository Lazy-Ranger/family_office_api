import './utils/loadEnvFile';
import app from './app';
import { sequelize } from './database';
import { PORT } from './config';
import { valueToBoolean } from '../src/utils/common';

const port =
  valueToBoolean(PORT) && valueToBoolean(Number(PORT)) ? Number(PORT) : 3000;

const connections = [sequelize.authenticate()];
Promise.all(connections)
  .then(() => {
    app.listen(port, (): void => {
      console.log(`Server running in port ${port}`);
    });
  })
  .catch((err) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Unable to connect to the database:`, err);
    process.exit(1)
  });
