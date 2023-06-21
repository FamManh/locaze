import {
  HttpException,
  HttpStatus,
  type ValidationError,
  type ValidationPipeOptions,
} from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: errors.reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.property]: Object.values(
              currentValue.constraints ?? {}
            ).join(', '),
          }),
          {}
        ),
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    ),
};

export default validationOptions;
