import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';

export class EntryData<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  @ApiProperty()
  readonly success: boolean;

  @ApiProperty()
  readonly message: string;

  constructor({
    data,
    success,
    message,
    meta,
  }: {
    data: T[];
    success: boolean;
    message: string;
    meta: PageMetaDto;
  }) {
    this.data = data;
    this.success = success;
    this.message = message;
    this.meta = meta;
  }
}
