import { validation } from "../../../share/middlewares/Validation";
import { schemaVars } from "../../../share/utils/schemasVars";
import { z } from "zod"

export const validationCreateUsers = validation((getSchemas) => ({
    body: getSchemas(z.object({
        name: schemaVars.text,
        email: schemaVars.email,
        password: schemaVars.password,
        comfirmPassword: schemaVars.password,
    }))
}))