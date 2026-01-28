import { ExecuteHandler } from "../../core/handlers/executeHandler"
import { NoShowRoleRepository } from "./noShowRole.repository"
import { NoShowRoleService } from "./noShowRole.service"

export function makeNoShowRoleService() {
     const execute = new ExecuteHandler(true, "Service")
        const repo = new NoShowRoleRepository(execute)
    
        return new NoShowRoleService(execute, repo)
}