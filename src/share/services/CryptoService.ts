import { genSalt, hash, compare } from "bcryptjs";

const SALT_RANDOMS = 8

export class CryptoService {
    public async hashText(password: string) {
        const saltGenerated = await genSalt(SALT_RANDOMS);
        return await hash(password, saltGenerated)
    }
    public async verifyText(password: string, hashPassword: string) {
        return await compare(password,hashPassword)
    }
}