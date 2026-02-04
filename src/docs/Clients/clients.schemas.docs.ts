/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "clt_123456"
 *
 *         businesses_id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *
 *         name:
 *           type: string
 *           example: João Silva
 *
 *         phone:
 *           type: string
 *           example: "+55 11 98888-7777"
 *
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *
 *     ClientCreate:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: Maria Souza
 *
 *         phone:
 *           type: string
 *           example: "+55 21 97777-6666"
 *
 *         email:
 *           type: string
 *           format: email
 *           example: maria@email.com
 *
 *
 *     ClientUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Carlos Silva
 *
 *         phone:
 *           type: string
 *           example: "+55 31 95555-4444"
 *
 *         email:
 *           type: string
 *           format: email
 *           example: carlos@email.com
 *
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
