export default interface IStorageProvider {
  saveFile(file: String): Promise<string>;
  deleteFile(file: String): Promise<void>;
}
