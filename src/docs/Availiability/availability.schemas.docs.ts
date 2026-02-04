/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Availability:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *
 *         professional_id:
 *           type: number
 *           example: 4
 *
 *         day_of_week:
 *           type: string
 *           example: monday
 *
 *         start_time:
 *           type: string
 *           example: "08:00"
 *
 *         end_time:
 *           type: string
 *           example: "12:00"
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *
 *     AvailabilityCreate:
 *       type: object
 *       required:
 *         - professional_id
 *         - day_of_week
 *         - start_time
 *         - end_time
 *       properties:
 *         professional_id:
 *           type: number
 *           example: 2
 *
 *         day_of_week:
 *           type: string
 *           example: friday
 *
 *         start_time:
 *           type: string
 *           example: "13:00"
 *
 *         end_time:
 *           type: string
 *           example: "18:00"
 *
 *
 *     AvailabilityUpdate:
 *       type: object
 *       properties:
 *         day_of_week:
 *           type: string
 *           example: tuesday
 *
 *         start_time:
 *           type: string
 *           example: "09:00"
 *
 *         end_time:
 *           type: string
 *           example: "17:00"
 *
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
