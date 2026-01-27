import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const serviceSchema = z.object({
    name: schemaVars.text,
    specialty: schemaVars.text,
})

const serviceByIdSchema = z.object({
    professional_id: schemaVars.text
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