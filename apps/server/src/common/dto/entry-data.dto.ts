import { ApiProperty } from '@nestjs/swagger';

export class EntryData<T> {
  @ApiProperty()
  readonly data: T;

  @ApiProperty()
  readonly success: boolean;

  @ApiProperty()
  readonly message: string;

  constructor({
    data,
    success = true,
    message,
  }: {
    data: T;
    success?: boolean;
    message?: string;
  }) {
    this.data = data;
    this.success = success;
    this.message = message;
  }
}
