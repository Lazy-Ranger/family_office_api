export const JWT_CONFIG: {
  SECRET: string;
  EXPIRE_TIME: string | number;
} = {
  SECRET: process.env.JWT_SECRET!,
  EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || "1d",
};
