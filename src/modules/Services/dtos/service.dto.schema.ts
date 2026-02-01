import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const serviceSchema = z.object({
    name: schemaVars.text,
    duration_minutes: z.string(),
    price: z.string()
})

const serviceByIdSchema = z.object({
    services_id: z.string()
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