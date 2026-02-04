/**
 * @openapi
 * tags:
 *   - name: Availability
 *     description: Gerenciamento de disponibilidade dos profissionais
 */

/**
 * @openapi
 * /api/v1/availability/{professional_id}:
 *   get:
 *     tags:
 *       - Availability
 *     summary: Buscar disponibilidade do profissional
 *     description: Retorna os horários disponíveis de um profissional
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: professional_id
 *         required: true
 *         schema:
 *           type: number
 *           example: 2
 *     responses:
 *       200:
 *         description: Lista de disponibilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Availability'
 *       404:
 *         description: Profissional não encontrado
 */

/**
 * @openapi
 * /api/v1/availability:
 *   post:
 *     tags:
 *       - Availability
 *     summary: Criar disponibilidade
 *     description: Cria um novo horário disponível para um profissional
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvailabilityCreate'
 *     responses:
 *       200:
 *         description: Disponibilidade criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'
 */

/**
 * @openapi
 * /api/v1/availability/{availability_id}:
 *   put:
 *     tags:
 *       - Availability
 *     summary: Atualizar disponibilidade
 *     description: Atualiza um horário disponível
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: availability_id
 *         required: true
 *         schema:
 *           type: number
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvailabilityUpdate'
 *     responses:
 *       200:
 *         description: Disponibilidade atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'
 */

/**
 * @openapi
 * /api/v1/availability/{availability_id}:
 *   delete:
 *     tags:
 *       - Availability
 *     summary: Remover disponibilidade
 *     description: Remove um horário disponível
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: availability_id
 *         required: true
 *         schema:
 *           type: number
 *           example: 3
 *     responses:
 *       204:
 *         description: Disponibilidade removida
 */
