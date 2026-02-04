/**
 * @openapi
 * tags:
 *   - name: NoShowRules
 *     description: Gerenciamento de regras de no-show (faltas em agendamentos)
 */

/**
 * @openapi
 * /api/v1/no-show/rules:
 *   get:
 *     tags:
 *       - NoShowRules
 *     summary: Buscar regras de no-show do negócio
 *     description: Retorna todas as regras de no-show vinculadas ao business autenticado via cookie
 *     responses:
 *       200:
 *         description: Lista de regras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoShowRule'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

/**
 * @openapi
 * /api/v1/no-show/rules:
 *   post:
 *     tags:
 *       - NoShowRules
 *     summary: Criar regra de no-show
 *     description: Cria uma nova regra de penalidade por ausência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoShowRuleCreate'
 *     responses:
 *       200:
 *         description: Regra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoShowRule'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */

/**
 * @openapi
 * /api/v1/no-show/rules/{noShowRule_id}:
 *   put:
 *     tags:
 *       - NoShowRules
 *     summary: Atualizar regra de no-show
 *     parameters:
 *       - in: path
 *         name: noShowRule_id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoShowRuleUpdate'
 *     responses:
 *       200:
 *         description: Regra atualizada
 *       404:
 *         description: Regra não encontrada
 */

/**
 * @openapi
 * /api/v1/no-show/rules/{noShowRule_id}:
 *   delete:
 *     tags:
 *       - NoShowRules
 *     summary: Remover regra de no-show
 *     parameters:
 *       - in: path
 *         name: noShowRule_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Regra removida com sucesso
 *       404:
 *         description: Regra não encontrada
 */