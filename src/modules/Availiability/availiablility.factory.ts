import { ExecuteHandler } from "../../core/handlers/executeHandler"
import { AvailiablilityRepository } from "./availiablility.repository"
import { AvailiablilityService } from "./availiablility.service"

export function makeAvailiablilityService() {
     const execute = new ExecuteHandler(true, "Service")
        const repo = new AvailiablilityRepository(execute)
    
        return new AvailiablilityService(execute, repo)
}