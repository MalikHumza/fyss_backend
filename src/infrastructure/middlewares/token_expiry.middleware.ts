import { HttpError } from 'routing-controllers';
import { getAuthorization } from './auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { parseJwt } from '../common/jwt';

export const CheckTokenExpiry = (req: Request, _: Response, next: NextFunction) => {
  const Authorization = getAuthorization(req);
  if (!Authorization) {
    throw new HttpError(401, 'Token not found');
  }
  const { exp } = parseJwt(Authorization);
  const is_token_expired = exp * 1000 < Date.now();
  if (is_token_expired) {
    throw new HttpError(401, 'Invalid Token');
  }
  next();
};
