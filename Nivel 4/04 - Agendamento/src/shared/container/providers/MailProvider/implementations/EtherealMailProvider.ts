import nodemailer, { Transporter } from "nodemailer";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailProvider from "../models/IMailProvider";

import { injectable, inject } from "tsyringe";

import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor(
    @inject("MailTemplateProvider")
    private mailTempalteProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    subject,
    to,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || "Equipe GoBarber",
        address: from?.email || "gobarber@gmail.com",
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTempalteProvider.parse(templateData),
    });

    console.log("Menssage sent", message);
    console.log("Menssage sent", nodemailer.getTestMessageUrl(message));

    return;
  }
}
