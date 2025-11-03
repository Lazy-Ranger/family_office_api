import './utils/loadEnvFile';
import app from './app';
import { sequelize } from '../config/database.config';
import { PORT } from '../config';
import { valueToBoolean } from '../src/utils/common';

const port =
  valueToBoolean(PORT) && valueToBoolean(Number(PORT)) ? Number(PORT) : 3000;

const connections = [sequelize.authenticate()];
Promise.all(connections)
  .then(() => {
    console.log('Connection to DB has been established successfully.');
    app.listen(port, (): void => {
      // eslint-disable-next-line no-console
      console.log(`Server running in port ${port}`);
    });
  })
  .catch((err) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Unable to connect to the database:`, err);
    process.exit(1)
  });
