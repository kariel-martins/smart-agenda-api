import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { env } from "./env";

const { backend_url } = env()

const options: swaggerJSDoc.Options = {
    definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart agenda API",
      version: "1.0.0",
      description: "Documentação da API do app web de enquetes Smart agenda",
    },
    servers: [
      {
        url: backend_url,
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger docs disponível em: ${backend_url}/api-docs`);
};