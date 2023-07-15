import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import fileConfig from './config/file.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { ForgotModule } from './modules/forgot/forgot.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { MailModule } from './modules/mail/mail.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    // Serve static files uploaded in public folder
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Serve vue static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'html'),
    }),
    UserModule,
    AuthModule,
    HealthCheckModule,
    ProjectModule,
    ForgotModule,
    MailerModule,
    MailModule,
    FilesModule,
  ],
})
export class AppModule {}
