export interface ICryptoService {
  hashText(text: string): Promise<string>;
  verifyText(text: string, hash: string): Promise<boolean>;
}
