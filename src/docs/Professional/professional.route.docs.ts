/**
 * @openapi
 * tags:
 *   - name: Professionals
 *     description: Gerenciamento de profissionais do negócio
 */

/**
 * @openapi
 * /api/v1/professionals:
 *   get:
 *     tags:
 *       - Professionals
 *     summary: Listar profissionais do negócio
 *     description: Retorna todos os profissionais vinculados ao business autenticado via cookie
 *     responses:
 *       200:
 *         description: Lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professional'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

/**
 * @openapi
 * /api/v1/professionals:
 *   post:
 *     tags:
 *       - Professionals
 *     summary: Criar profissional
 *     description: Cria um novo profissional para o negócio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalCreate'
 *     responses:
 *       201:
 *         description: Profissional criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professional'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */

/**
 * @openapi
 * /api/v1/professionals/{professional_id}:
 *   put:
 *     tags:
 *       - Professionals
 *     summary: Atualizar profissional
 *     parameters:
 *       - in: path
 *         name: professional_id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalUpdate'
 *     responses:
 *       200:
 *         description: Profissional atualizado
 *       404:
 *         description: Profissional não encontrado
 */

/**
 * @openapi
 * /api/v1/professionals/{professional_id}:
 *   delete:
 *     tags:
 *       - Professionals
 *     summary: Remover profissional
 *     parameters:
 *       - in: path
 *         name: professional_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Profissional removido com sucesso
 *       404:
 *         description: Profissional não encontrado
 */
