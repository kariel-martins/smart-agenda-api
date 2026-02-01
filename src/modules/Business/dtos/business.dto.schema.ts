import { z } from "zod"
import { validation } from "../../../share/middlewares/Validation";
import { schemaVars } from "../../../share/utils/schemasVars";

const BusinessUpdate = z.object({
    name: schemaVars.text,
    phone: schemaVars.text,
    email: schemaVars.email,
})

export const BusinessUpdateValidateion = validation((getSchema) => ({
    body: getSchema(BusinessUpdate),
}))