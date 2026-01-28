import { z } from "zod"
import { validation } from "../../../share/middlewares/Validation";
import { schemaVars } from "../../../share/utils/schemasVars";

const Business_Id = z.object({
   business_id: schemaVars.text
})


const BusinessUpdate = z.object({
    name: schemaVars.text.optional(),
    phone: schemaVars.number.optional(),
    email: schemaVars.email.optional(),
})

export const BusinessGetByIdValidateion = validation((getSchema) => ({
    body: getSchema(Business_Id)
}))


export const BusinessUpdateValidateion = validation((getSchema) => ({
    body: getSchema(BusinessUpdate),
    params: getSchema(Business_Id)
}))