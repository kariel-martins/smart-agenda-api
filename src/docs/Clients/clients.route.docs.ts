/**
 * @openapi
 * tags:
 *   - name: Clients
 *     description: Gerenciamento de clientes
 */

/**
 * @openapi
 * /api/v1/clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Listar clientes da empresa
 *     description: Retorna todos os clientes vinculados à empresa autenticada
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       401:
 *         description: Não autorizado
 */

/**
 * @openapi
 * /api/v1/clients:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Criar cliente
 *     description: Cria um novo cliente para a empresa autenticada
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientCreate'
 *     responses:
 *       200:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Dados inválidos
 */

/**
 * @openapi
 * /api/v1/clients/{client_id}:
 *   put:
 *     tags:
 *       - Clients
 *     summary: Atualizar cliente
 *     description: Atualiza os dados de um cliente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientUpdate'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 */

/**
 * @openapi
 * /api/v1/clients/{client_id}:
 *   delete:
 *     tags:
 *       - Clients
 *     summary: Remover cliente
 *     description: Remove um cliente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
