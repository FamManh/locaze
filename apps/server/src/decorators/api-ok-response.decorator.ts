import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse as BaseApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { EntryData } from '../common/dto/entry-data.dto';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiOkResponse<T extends Type>(options: {
  type: T;
  description?: string;
}): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(EntryData, options.type),
    BaseApiOkResponse({
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(EntryData) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(options.type),
              },
            },
          },
        ],
      },
    })
  );
}
