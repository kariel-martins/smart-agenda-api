import { ExecuteHandler } from "../../core/handlers/executeHandler"
import { BusinessRepository } from "./business.repository"
import { BusinessService } from "./business.service"

export function makeBusinessService() {
     const execute = new ExecuteHandler(true, "Business")
        const repo = new BusinessRepository(execute)
    
        return new BusinessService(execute, repo)
}