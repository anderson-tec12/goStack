import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailProvider from "../models/IMailTemplateProvider";

class FakeTemplateMailProvider implements IMailProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeTemplateMailProvider;
