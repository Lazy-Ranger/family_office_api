import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  // Store original send
  const originalSend = res.send.bind(res);
  res.send = ((body?: any) => {
    const responseTime = Date.now() - start;
    return originalSend(body);
  }) as Response["send"];

  next();
};