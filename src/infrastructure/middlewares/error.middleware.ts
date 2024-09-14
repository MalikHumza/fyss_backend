import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'routing-controllers';
import { logger } from '../common/logger';

export const ErrorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.httpCode || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
