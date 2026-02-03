/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - nameBusiness
 *         - phone
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: João Silva
 *         nameBusiness:
 *           type: string
 *           minLength: 3
 *           example: Barbearia
 *         phone:
 *           type: string
 *           example: +55 (99) 7 8342-6476
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: "Senha@123"
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: "Senha@123"
 *
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: "Senha@123"
 *
 *     forgotPasswordInput:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *
 *     resetPasswordInput:
 *       type: object
 *       required:
 *        - password
 *        - confirmPassword
 *       properties:
 *         password:
 *           type: string
 *           format: password
 *           example: "Senha@123"
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: "Senha@123"
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
