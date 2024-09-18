import { validate } from "class-validator";
import { ValidationError } from "class-validator";
import { HttpError } from "routing-controllers";

export const FormValidationMiddleware = async (data: object) => {
  const errors = await validate(data);

  if (errors.length > 0) {
    const message = errors
      .map((error: ValidationError) => Object.values(error.constraints))
      .join(", ");
    throw new HttpError(400, String(message));
  }

  return;
};
