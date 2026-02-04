/**
 * @openapi
 * components:
 *   schemas:
 *
 *     AuthRegister:
 *       type: object
 *       required:
 *         - name
 *         - nameBusiness
 *         - email
 *         - phone
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *           example: João Silva
 *
 *         nameBusiness:
 *           type: string
 *           example: Barbearia Central
 *
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *
 *         phone:
 *           type: string
 *           example: "+55 11 98888-7777"
 *
 *         password:
 *           type: string
 *           format: password
 *           example: "12345678"
 *
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: "12345678"
 *
 *
 *     AuthLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *
 *         password:
 *           type: string
 *           format: password
 *           example: "12345678"
 *
 *
 *     AuthForgotPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *
 *
 *     AuthResetPassword:
 *       type: object
 *       required:
 *         - password
 *         - confirmPassword
 *       properties:
 *         password:
 *           type: string
 *           format: password
 *           example: "novaSenha123"
 *
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: "novaSenha123"
 *
 *
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *
 *         name:
 *           type: string
 *
 *         email:
 *           type: string
 *
 *         user_role:
 *           type: string
 *           example: admin
 *
 *
 *     AuthBusiness:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *
 *         name:
 *           type: string
 *
 *         phone:
 *           type: string
 *
 *         email:
 *           type: string
 *
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         usersData:
 *           $ref: '#/components/schemas/AuthUser'
 *
 *         businessData:
 *           $ref: '#/components/schemas/AuthBusiness'
 *
 *
 *     AuthRefreshResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Validação bem sucedida!
 *
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
