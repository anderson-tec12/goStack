import IMailProvider from "../models/IMailTemplateProvider";

class FakeTemplateMailProvider implements IMailProvider {
  public async parse(): Promise<string> {
    return "Mail content";
  }
}

export default FakeTemplateMailProvider;
