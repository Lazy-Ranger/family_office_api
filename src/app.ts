import express from 'express';
// import 'express-async-errors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
// import routes from './routes';
import ErrorHandlerMiddleware from './middlewares/errors/errorHandlerMiddleware';
import { CORS_WHITELIST, RATE_LIMIT } from '../config';

const app: express.Application = express();
const errorHandler: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();
const corsOptions: CorsOptions = {
  origin: CORS_WHITELIST?.split(','),
};

app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false,
  strictTransportSecurity: false,
  xContentTypeOptions: false,
  xFrameOptions: false,
  xPoweredBy: false,
  xXssProtection: false,
}));
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    // increase limit to 10mb
    limit: '10mb',
  })
);

// setting API request rate limit for all requests
app.use(
  rateLimit({
    windowMs: 60 * 1000 * Number(RATE_LIMIT.TIME ?? 1), // min 1 minute duration in milliseconds
    max: Number(RATE_LIMIT.COUNT ?? 100),
    message: `You exceeded ${RATE_LIMIT.COUNT ?? 100} requests in ${
      RATE_LIMIT.TIME ?? 1
    } Minute(s) limit!`,
    headers: true,
  })
);

// app.use('/api', routes);
app.use(errorHandler.handleErrors);
app.use(function(req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
});

app.set('trust proxy', '127.0.0.1');
app.set('x-powered-by', false);

export default app;
