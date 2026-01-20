import { validation } from "../../../share/middlewares/Validation";
import { z } from "zod"
import { schemaVars } from "../../../share/utils/schemasVars";

export const validationCreateUsers = validation((getSchemas) => ({
    body: getSchemas(z.object({
        name: schemaVars.text,
        email: schemaVars.email,
        password: schemaVars.password,
        comfirmPassword: schemaVars.password,
    }))
}))