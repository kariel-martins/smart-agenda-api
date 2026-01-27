import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const professionalSchema = z.object({
    name: schemaVars.text,
    specialty: schemaVars.text,
})

const professionalByIdSchema = z.object({
    professional_id: schemaVars.text
})

export const professionalCreateValidate = validation((getSchemas) => ({
    body: getSchemas(professionalSchema)
})) 

export const professionalValidate = validation((getSchemas) => ({
    params: getSchemas(professionalByIdSchema)
})) 

export const professionalUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(professionalSchema),
    params: getSchemas(professionalByIdSchema)
})) 

export const professionalDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(professionalByIdSchema)
})) 