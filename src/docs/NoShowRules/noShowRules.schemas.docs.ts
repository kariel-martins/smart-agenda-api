
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     NoShowRule:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         businesses_id:
 *           type: string
 *           format: uuid
 *         max_rate_percent:
 *           type: number
 *           example: 50
 *         action:
 *           type: string
 *           example: block_booking
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     NoShowRuleCreate:
 *       type: object
 *       required:
 *         - max_rate_percent
 *         - action
 *       properties:
 *         max_rate_percent:
 *           type: number
 *           example: 30
 *         action:
 *           type: string
 *           example: apply_fee
 *
 *     NoShowRuleUpdate:
 *       type: object
 *       properties:
 *         max_rate_percent:
 *           type: number
 *           example: 60
 *         action:
 *           type: string
 *           example: block_account
 */
