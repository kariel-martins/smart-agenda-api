/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: Gerenciamento de Funcionários
 */

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Buscar todos os funcionários da empresa
 *     description: Retorna os dados de todos os funcionários da empresa
 *     responses:
 *       200:
 *         description: Funcionários retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Não há funcionários registrados
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Buscar funcionário por ID
 *     description: Retorna os dados de um funcionário da empresa
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Funcionário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cadastrar um funcionário
 *     description: Registra um novo funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualizar dados do funcionário
 *     description: Atualiza os dados de um funcionário
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Não foi possível atualizar os dados
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Remover funcionário
 *     description: Remove um funcionário da empresa
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
