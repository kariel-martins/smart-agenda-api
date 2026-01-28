import { ExecuteHandler } from "../../core/handlers/executeHandler"
import { AppointmentRepository } from "./appointment.repository"
import { AppointmentService } from "./appointment.service"

export function makeAppointmentService() {
     const execute = new ExecuteHandler(true, "Service")
        const repo = new AppointmentRepository(execute)
    
        return new AppointmentService(execute, repo)
}