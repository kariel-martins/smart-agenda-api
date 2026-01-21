import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service"

export function makeUserService() {
    const execute = new ExecuteHandler(true, "Users")
    const repo = new UserRepository(execute)

    return new UserService(execute, repo)
}