import { ExecuteHandler } from "../../core/handlers/executeHandler"
import { ClientRepository } from "./client.repository"
import { ClientService } from "./client.service"

export function makeClientService() {
     const execute = new ExecuteHandler(true, "Client")
        const repo = new ClientRepository(execute)
    
        return new ClientService(execute, repo)
}