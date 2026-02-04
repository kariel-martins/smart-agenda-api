
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         businesses_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Corte Masculino
 *         duration_minutes:
 *           type: string
 *           example: "45"
 *         price:
 *           type: string
 *           example: "50.00"
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     ServiceCreate:
 *       type: object
 *       required:
 *         - name
 *         - duration_minutes
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: Barba Completa
 *         duration_minutes:
 *           type: string
 *           example: "30"
 *         price:
 *           type: string
 *           example: "35.00"
 *
 *     ServiceUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Corte Premium
 *         duration_minutes:
 *           type: string
 *           example: "60"
 *         price:
 *           type: string
 *           example: "80.00"
 */
