/* eslint-disable @typescript-eslint/naming-convention */
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotEquals,
} from 'class-validator';
import { ApiEnumProperty } from './property.decorators';
import { ToArray, ToLowerCase, ToUpperCase } from './transform.decorators';
import { IsNullable, IsUndefinable } from './validator.decorators';

interface FieldOptions {
  each?: boolean;
  swagger?: boolean;
  nullable?: boolean;
  groups?: string[];
}

interface StringFieldOptions extends FieldOptions {
  minLength?: number;
  maxLength?: number;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
}

interface FieldOptions {
  each?: boolean;
  swagger?: boolean;
  nullable?: boolean;
  groups?: string[];
}

interface NumberFieldOptions extends FieldOptions {
  min?: number;
  max?: number;
  int?: boolean;
  isPositive?: boolean;
}

type EnumFieldOptions = FieldOptions;

export function NumberFieldOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    NumberFieldOptions = {}
): PropertyDecorator {
  return applyDecorators(
    IsUndefinable(),
    NumberField({ required: false, ...options })
  );
}

export function NumberField(
  options: Omit<ApiPropertyOptions, 'type'> & NumberFieldOptions = {}
): PropertyDecorator {
  const decorators = [Type(() => Number)];

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: Number, ...options }));
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  if (options.int) {
    decorators.push(IsInt({ each: options.each }));
  } else {
    decorators.push(IsNumber({}, { each: options.each }));
  }

  if (typeof options.min === 'number') {
    decorators.push(Min(options.min, { each: options.each }));
  }

  if (typeof options.max === 'number') {
    decorators.push(Max(options.max, { each: options.each }));
  }

  if (options.isPositive) {
    decorators.push(IsPositive({ each: options.each }));
  }

  return applyDecorators(...decorators);
}

export function StringFieldOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    StringFieldOptions = {}
): PropertyDecorator {
  return applyDecorators(
    IsUndefinable(),
    StringField({ required: false, ...options })
  );
}

export function StringField(
  options: Omit<ApiPropertyOptions, 'type'> & StringFieldOptions = {}
): PropertyDecorator {
  const decorators = [Type(() => String), IsString({ each: options.each })];

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({ type: String, ...options, isArray: options.each })
    );
  }

  const minLength = options.minLength || 1;

  decorators.push(MinLength(minLength, { each: options.each }));

  if (options.maxLength) {
    decorators.push(MaxLength(options.maxLength, { each: options.each }));
  }

  if (options.toLowerCase) {
    decorators.push(ToLowerCase());
  }

  if (options.toUpperCase) {
    decorators.push(ToUpperCase());
  }

  return applyDecorators(...decorators);
}

export function EnumField<TEnum extends object>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName' | 'isArray'> &
    EnumFieldOptions = {}
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
  const enumValue = getEnum();
  const decorators = [IsEnum(enumValue, { each: options.each })];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiEnumProperty(getEnum, { ...options, isArray: options.each })
    );
  }

  return applyDecorators(...decorators);
}

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/naming-convention
export function EnumFieldOptional<TEnum extends object>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> &
    EnumFieldOptions = {}
): PropertyDecorator {
  return applyDecorators(
    IsUndefinable(),
    EnumField(getEnum, { required: false, ...options })
  );
}
