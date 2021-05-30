import { Request, Response, NextFunction } from 'express';

// functional logger
export function logger(req: Request, res: Response, next: NextFunction) {
  next();
}
