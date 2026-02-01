import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const appointmentSchema = z.object({
   professional_id: schemaVars.number,
   service_id: schemaVars.number,
   client_id: schemaVars.text,
   start_time: schemaVars.text,
   end_time: schemaVars.text,
   status: schemaVars.text,
   day_of_week: schemaVars.text,
   date: schemaVars.date
})

const appointmentByIdSchema = z.object({
    appointments_id: schemaVars.number
})

export const appointmentCreateValidate = validation((getSchemas) => ({
    body: getSchemas(appointmentSchema)
})) 

export const appointmentValidate = validation((getSchemas) => ({
    params: getSchemas(appointmentByIdSchema)
})) 

export const appointmentByDateValidate = validation((getSchemas) => ({
    query: getSchemas(z.object({date: schemaVars.date}))
})) 

export const appointmentByIdValidate = validation((getSchemas) => ({
    params: getSchemas(appointmentByIdSchema)
})) 

export const appointmentUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(appointmentSchema),
    params: getSchemas(appointmentByIdSchema)
})) 

export const appointmentDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(appointmentByIdSchema)
})) 