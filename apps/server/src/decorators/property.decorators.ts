/* eslint-disable @typescript-eslint/naming-convention */
import type { ApiPropertyOptions } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

import { getVariableName } from '../common/utils';

export function ApiEnumProperty<TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type'> & { each?: boolean } = {}
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enumValue = getEnum() as any;

  return ApiProperty({
    type: 'enum',
    // throw error during the compilation of swagger
    // isArray: options.each,
    enum: enumValue,
    enumName: getVariableName(getEnum),
    ...options,
  });
}
