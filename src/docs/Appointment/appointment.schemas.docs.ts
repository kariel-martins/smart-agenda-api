/**
 * @openapi
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         businesses_id:
 *           type: string
 *           format: uuid
 *         professional_id:
 *           type: number
 *         client_id:
 *           type: string
 *           format: uuid
 *         service_id:
 *           type: number
 *         date:
 *           type: string
 *           example: "2026-02-04"
 *         start_time:
 *           type: string
 *           example: "14:00"
 *         end_time:
 *           type: string
 *           example: "15:00"
 *         status:
 *           type: string
 *           example: confirmed
 *         cancel_reason:
 *           type: string
 *         confirm_at:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     AppointmentCreate:
 *       type: object
 *       required:
 *         - professional_id
 *         - service_id
 *         - client_id
 *         - start_time
 *         - end_time
 *         - status
 *         - day_of_week
 *         - date
 *       properties:
 *         professional_id:
 *           type: number
 *         service_id:
 *           type: number
 *         client_id:
 *           type: string
 *         start_time:
 *           type: string
 *         end_time:
 *           type: string
 *         status:
 *           type: string
 *         day_of_week:
 *           type: string
 *         date:
 *           type: string
 */