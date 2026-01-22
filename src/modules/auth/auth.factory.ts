import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

export function makeAuthService() {
    const execute = new ExecuteHandler(true, "Auth")
    const repo = new AuthRepository(execute)

    return new AuthService(execute, repo)
}