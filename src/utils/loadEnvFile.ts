if (process.env.NODE_ENV !== 'production') {
  // disable eslint for this line
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dotenv = require('dotenv');
  dotenv.config();
}
