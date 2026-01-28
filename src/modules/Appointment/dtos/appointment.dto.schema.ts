import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const appointmentSchema = z.object({
   professional_id: schemaVars.text,
   service_id: schemaVars.number,
   client_id: schemaVars.text,
   data: schemaVars.text,
   start_time: schemaVars.text
})

//business_id vai pelo jwt

const appointmentByIdSchema = z.object({
    professional_id: schemaVars.text
})

export const appointmentCreateValidate = validation((getSchemas) => ({
    body: getSchemas(appointmentSchema)
})) 

export const appointmentValidate = validation((getSchemas) => ({
    params: getSchemas(appointmentByIdSchema)
})) 

export const appointmentUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(appointmentSchema),
    params: getSchemas(appointmentByIdSchema)
})) 

export const appointmentDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(appointmentByIdSchema)
})) 