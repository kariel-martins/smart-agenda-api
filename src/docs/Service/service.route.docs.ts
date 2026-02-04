/**
 * @openapi
 * tags:
 *   - name: Services
 *     description: Gerenciamento de serviços do negócio
 */

/**
 * @openapi
 * /api/v1/services:
 *   get:
 *     tags:
 *       - Services
 *     summary: Listar serviços do negócio
 *     description: Retorna todos os serviços vinculados ao business autenticado via cookie
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

/**
 * @openapi
 * /api/v1/services:
 *   post:
 *     tags:
 *       - Services
 *     summary: Criar serviço
 *     description: Cria um novo serviço para o negócio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceCreate'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Dados inválidos
 */

/**
 * @openapi
 * /api/v1/services/{services_id}:
 *   put:
 *     tags:
 *       - Services
 *     summary: Atualizar serviço
 *     parameters:
 *       - in: path
 *         name: services_id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceUpdate'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *       404:
 *         description: Serviço não encontrado
 */

/**
 * @openapi
 * /api/v1/services/{services_id}:
 *   delete:
 *     tags:
 *       - Services
 *     summary: Remover serviço
 *     parameters:
 *       - in: path
 *         name: services_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Serviço removido com sucesso
 *       404:
 *         description: Serviço não encontrado
 */