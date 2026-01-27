import { IJwtData } from "../types/JWTService";

export interface IJWTService {
    sign(data: IJwtData, expireInMinutes: number): Promise<string>
    verify(token: string): Promise<IJwtData>
}