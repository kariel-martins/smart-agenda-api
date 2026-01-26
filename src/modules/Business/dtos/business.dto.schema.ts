import { z } from "zod"
import { validation } from "../../../share/middlewares/Validation";
import { schemaVars } from "../../../share/utils/schemasVars";

const BusinessCreate = z.object({
    name: schemaVars.text,
    phone: schemaVars.number,
    email: schemaVars.email,
})


const Business_Id = z.object({
   business_id: schemaVars.text
})


const BusinessUpdate = z.object({
    name: schemaVars.text.optional(),
    phone: schemaVars.number.optional(),
    email: schemaVars.email.optional(),
})

export const BusinessCreateValidateion = validation((getSchema) => ({
    body: getSchema(BusinessCreate)
}))


export const BusinessGetByIdValidateion = validation((getSchema) => ({
    body: getSchema(Business_Id)
}))


export const BusinessUpdateValidateion = validation((getSchema) => ({
    body: getSchema(BusinessUpdate),
    params: getSchema(Business_Id)
}))


export const BusinessDeleteValidateion = validation((getSchema) => ({
    body: getSchema(Business_Id)
}))
