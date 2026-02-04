/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBusiness:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: João Silva
 *         phone:
 *           type: string
 *           example: +55 (99) 7 8342-6476
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com

 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
