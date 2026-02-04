
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Professional:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         businesses_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: João Silva
 *         specialty:
 *           type: string
 *           example: Barbeiro
 *         role:
 *           type: string
 *           example: ADMIN
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     ProfessionalCreate:
 *       type: object
 *       required:
 *         - name
 *         - specialty
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: Maria Souza
 *         specialty:
 *           type: string
 *           example: Cabeleireira
 *         role:
 *           type: string
 *           example: MANAGER
 *
 *     ProfessionalUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Carlos Lima
 *         specialty:
 *           type: string
 *           example: Esteticista
 *         role:
 *           type: string
 *           example: ADMIN
 */
