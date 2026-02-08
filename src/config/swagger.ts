import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { SwaggerTheme, SwaggerThemeName } from "swagger-themes";

const theme = new SwaggerTheme();
const css = theme.getBuffer("dark"  as SwaggerThemeName);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "📅 Smart Agenda API",
      version: "1.0.0",
      description: `
## Smart Agenda API

Sistema de autenticação e gerenciamento do app Smart Agenda.

### Recursos:
- Autenticação
- Usuários
- Agenda
- Enquetes

🚀 Node.js + TypeScript
      `,
    },
    servers: [
      {
        url: "/",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: css,
      customSiteTitle: "Smart Agenda API Docs",
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: "none",
        filter: true,
        displayRequestDuration: true,
      },
    })
  );

  console.log(`📘 Swagger disponível em: /api-docs`);
};
