import { valueToBoolean } from '../src/utils/common';

export const PORT = valueToBoolean(process.env.PORT) ? process.env.PORT : 3000;

export const RATE_LIMIT = {
  TIME: process.env.RATE_LIMIT_TIME,
  COUNT: process.env.RATE_LIMIT_REQ_COUNT,
};

export const CORS_WHITELIST = valueToBoolean(process.env.CORS_WHITELIST)
  ? process.env.CORS_WHITELIST
  : '';


  