import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const clientSchema = z.object({
    name: schemaVars.text,
    phone: schemaVars.number,
    email: schemaVars.email,
})

const clientByIdSchema = z.object({
    client_id: schemaVars.text
})

export const clientCreateValidate = validation((getSchemas) => ({
    body: getSchemas(clientSchema)
})) 

export const clientValidate = validation((getSchemas) => ({
    params: getSchemas(clientByIdSchema)
})) 

export const clientUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(clientSchema),
    params: getSchemas(clientByIdSchema)
})) 

export const clientDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(clientByIdSchema)
})) 