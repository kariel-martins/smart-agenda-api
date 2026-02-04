/**
 * @openapi
 * tags:
 *   - name: Appointments
 *     description: Gerenciamento de serviços
 */
/**
 * @openapi
 * /api/v1/appointments:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Buscar agendamentos por data
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           example: "2026-02-04"
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */
/**
 * @openapi
 * /api/v1/appointments:
 *   post:
 *     tags:
 *       - Appointments
 *     summary: Criar agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentCreate'
 *     responses:
 *       200:
 *         description: Agendamento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 */
/**
 * @openapi
 * /api/v1/appointments/{appointments_id}/confirm:
 *   patch:
 *     tags:
 *       - Appointments
 *     summary: Confirmar agendamento
 *     parameters:
 *       - in: path
 *         name: appointments_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Agendamento confirmado
 */
/**
 * @openapi
 * /api/v1/appointments/{appointments_id}/complete:
 *   patch:
 *     tags:
 *       - Appointments
 *     summary: Finalizar agendamento
 *     parameters:
 *       - in: path
 *         name: appointments_id
 *         required: true
 *         schema:
 *           type: number
 */
/**
 * @openapi
 * /api/v1/appointments/{appointments_id}/cancel:
 *   patch:
 *     tags:
 *       - Appointments
 *     summary: Cancelar agendamento
 *     parameters:
 *       - in: path
 *         name: appointments_id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancel_reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento cancelado
 */
/**
 * @openapi
 * /api/v1/appointments/{appointments_id}/no-show:
 *   patch:
 *     summary: Marcar falta do cliente
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: appointments_id
 *         required: true
 *         schema:
 *           type: number
 */

