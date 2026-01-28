import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars"
import { validation } from "../../../share/middlewares/Validation"

const noShowRoleSchema = z.object({
   max_rate_percent: schemaVars.number,
   action: schemaVars.text,
})

//business_id vai pelo jwt

const noShowRoleByIdSchema = z.object({
    professional_id: schemaVars.text
})

export const noShowRoleCreateValidate = validation((getSchemas) => ({
    body: getSchemas(noShowRoleSchema)
})) 

export const noShowRoleValidate = validation((getSchemas) => ({
    params: getSchemas(noShowRoleByIdSchema)
})) 

export const noShowRoleUpdateValidate = validation((getSchemas) => ({
    body: getSchemas(noShowRoleSchema),
    params: getSchemas(noShowRoleByIdSchema)
})) 

export const noShowRoleDeleteValidate = validation((getSchemas) => ({
    params: getSchemas(noShowRoleByIdSchema)
})) 