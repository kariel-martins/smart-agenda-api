import { SignOptions } from "jsonwebtoken";
import { IJwtData } from "../types/JWTService";

export interface IJWTService {
    sign(data: IJwtData, expiresIn: SignOptions["expiresIn"]): Promise<string>
    verify(token: string): Promise<IJwtData>
}