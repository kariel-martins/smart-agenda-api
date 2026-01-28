import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const serviceSchema = z.object({
    name: schemaVars.text,
    durationMinutes: schemaVars.number,
    price: schemaVars.number
})

const serviceByIdSchema = z.object({
    service_id: schemaVars.text
})

export const serviceCreateValidate = validation((getSchemas) => ({
    body: getSchemas(serviceSchema)
})) 

export const serviceValidate = validation((getSchemas) => ({
    params: getSchemas(serviceByIdSchema)
})) 

export const serviceUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(serviceSchema),
    params: getSchemas(serviceByIdSchema)
})) 

export const serviceDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(serviceByIdSchema)
})) 