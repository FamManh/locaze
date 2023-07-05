import path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { MailerService } from '../mailer/mailer.service';
import { MailData } from './interfaces/mail-data.interface';

const frontendDomainConfigKey = 'app.frontendDomain';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const emailConfirmTitle = 'Confirm email';
    const text1 = 'Hey!';
    const text2 = 'You’re almost ready to start enjoying';
    const text3 =
      'Simply click the big green button below to verify your email address.';

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${this.configService.get(frontendDomainConfigKey, {
        infer: true,
      })}/confirm-email/${mailData.data.hash} ${emailConfirmTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'activation.hbs'
      ),
      context: {
        title: emailConfirmTitle,
        url: `${this.configService.get(frontendDomainConfigKey, {
          infer: true,
        })}/confirm-email/${mailData.data.hash}`,
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
    const resetPasswordTitle = 'Reset password';
    const text1 = 'Trouble signing in?';
    const text2 = 'Resetting your password is easy.';
    const text3 =
      'Just press the button below and follow the instructions. We’ll have you up and running in no time.';
    const text4 =
      'If you did not make this request then please ignore this email.';

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: resetPasswordTitle,
      text: `${this.configService.get(frontendDomainConfigKey, {
        infer: true,
      })}/password-change/${mailData.data.hash} ${resetPasswordTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'reset-password.hbs'
      ),
      context: {
        title: resetPasswordTitle,
        url: `${this.configService.get(frontendDomainConfigKey, {
          infer: true,
        })}/password-change/${mailData.data.hash}`,
        actionTitle: resetPasswordTitle,
        app_name: this.configService.get('app.name', {
          infer: true,
        }),
        text1,
        text2,
        text3,
        text4,
      },
    });
  }
}
