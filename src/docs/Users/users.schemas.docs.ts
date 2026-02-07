/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         business_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: João Silva
 *         email:
 *           type: string
 *           format: email
 *           example: joao@empresa.com
 *         phone:
 *           type: string
 *           example: "11999999999"
 *         role:
 *           type: string
 *           example: staff
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     UserCreate:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - email
 *         - phone
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *           example: João Silva
 *         role:
 *           type: string
 *           example: professional
 *         email:
 *           type: string
 *           format: email
 *           example: joao@empresa.com
 *         phone:
 *           type: string
 *           example: "11999999999"
 *         password:
 *           type: string
 *           format: password
 *           example: "Senha@123"
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: "Senha@123"
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: João Silva Atualizado
 *         role:
 *           type: string
 *           example: manager
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *         confirmPassword:
 *           type: string
 *           format: password
 */
