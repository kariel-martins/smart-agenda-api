import { RequestHandler } from "express";
import { ZodObject, ZodRawShape } from "zod";

type Tprops = "body" | "params" | "query" | "header";

type TGetSchema = <T extends ZodRawShape>(schema: ZodObject<T>) => ZodObject<T>;

type TAllSchemas = Record<Tprops, ZodObject<any>>;

type TGetAllSchemas = (getSchemas: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    const result = schema.safeParse(req[key as Tprops]);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        if (!error.path.length) return;
        const path = error.path.join(".");
        errors[path] = error.message;
      });

      errorsResult[key] = errors;
    }
  });
  if (Object.keys(errorsResult).length === 0) {
    next();
  } else {
    res.status(400).json({ errors: errorsResult });
  } 
};
