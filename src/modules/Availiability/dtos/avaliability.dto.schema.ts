import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const availiablilitySchema = z.object({
    day_of_week: schemaVars.text,
    start_time: schemaVars.text,
    end_time: schemaVars.text,
    professional_id: schemaVars.number
})

const availiablilityByIdSchema = z.object({
    professional_id: schemaVars.number
})

const availiablilityIdSchema = z.object({
    availability_id: schemaVars.number
})

export const availiablilityCreateValidate = validation((getSchemas) => ({
    body: getSchemas(availiablilitySchema)
})) 

export type availiablilityData = z.infer<typeof availiablilitySchema>

export const availiablilityValidate = validation((getSchemas) => ({
    params: getSchemas(availiablilityByIdSchema)
})) 

export const availiablilityUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(availiablilitySchema),
    params: getSchemas(availiablilityIdSchema)
})) 

export const availiablilityDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(availiablilityByIdSchema)
})) 