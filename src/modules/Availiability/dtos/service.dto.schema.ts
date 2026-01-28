import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const availiablilitySchema = z.object({
    name: schemaVars.text,
    specialty: schemaVars.text,
})

const availiablilityByIdSchema = z.object({
    professional_id: schemaVars.text
})

export const availiablilityCreateValidate = validation((getSchemas) => ({
    body: getSchemas(availiablilitySchema)
})) 

export const availiablilityValidate = validation((getSchemas) => ({
    params: getSchemas(availiablilityByIdSchema)
})) 

export const availiablilityUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(availiablilitySchema),
    params: getSchemas(availiablilityByIdSchema)
})) 

export const availiablilityDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(availiablilityByIdSchema)
})) 