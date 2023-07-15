import { registerAs } from '@nestjs/config';
import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';
import { FileProviderEnum } from '../modules/files/enums/file-provider.enum';
import validateConfig from '../utils/validate-config';
import { FileConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsEnum(FileProviderEnum)
  FILE_DRIVER: FileProviderEnum;

  @ValidateIf((envValues) => envValues.FILE_DRIVER === FileProviderEnum.S3)
  @IsString()
  ACCESS_KEY_ID: string;

  @ValidateIf((envValues) => envValues.FILE_DRIVER === FileProviderEnum.S3)
  @IsString()
  SECRET_ACCESS_KEY: string;

  @ValidateIf((envValues) => envValues.FILE_DRIVER === FileProviderEnum.S3)
  @IsString()
  AWS_DEFAULT_S3_BUCKET: string;

  @ValidateIf((envValues) => envValues.FILE_DRIVER === FileProviderEnum.S3)
  @IsString()
  @IsOptional()
  AWS_DEFAULT_S3_URL: string;

  @ValidateIf((envValues) => envValues.FILE_DRIVER === FileProviderEnum.S3)
  @IsString()
  AWS_S3_REGION: string;
}

export default registerAs<FileConfig>('file', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    driver: process.env.FILE_DRIVER ?? 'local',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
    awsDefaultS3Url: process.env.AWS_DEFAULT_S3_URL,
    awsS3Region: process.env.AWS_S3_REGION,
    maxFileSize: 5242880, // 5mb
  };
});
