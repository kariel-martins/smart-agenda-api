/**
 * @openapi
 * tags:
 *   - name: Business
 *     description: Gerenciamento do perfil do negócio
 */

/**
 * @openapi
 * /api/v1/business/profile:
 *   get:
 *     tags:
 *       - Business
 *     summary: Buscar perfil do negócio autenticado
 *     description: Retorna os dados do negócio usando businessId armazenado em cookie
 *     responses:
 *       200:
 *         description: Perfil do negócio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 */

/**
 * @openapi
 * /api/v1/business/profile:
 *   put:
 *     tags:
 *       - Business
 *     summary: Atualizar perfil do negócio
 *     description: Atualiza dados do negócio autenticado via cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessUpdate'
 *     responses:
 *       200:
 *         description: Perfil atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 */
