import { HttpError } from "routing-controllers";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validateOrReject, ValidationError } from "class-validator";

export const ValidationMiddleware = (
  type: any,
  skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = false,
) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    validateOrReject(dto, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    })
      .then(() => {
        req.body = dto;
        next();
      })
      .catch((errors: ValidationError[]) => {
        const message = errors
          .map((error: ValidationError) => Object.values(error?.constraints))
          .join(", ");
        next(new HttpError(400, message));
      });
  };
};
