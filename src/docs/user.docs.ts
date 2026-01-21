/**
 * @openapi
 * tags:
 *   - name: users
 *     description: Endpoints relacionados à criação de usuários
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUsersInput:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *           example: User123
 *         surname:
 *           type: string
 *           example: ApelidoX
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           example: "senha123"
 *         confirmPassword:
 *           type: string
 *           example: "senha123"
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @openapi
 * /api/v1/signup/users:
 *   post:
 *     tags:
 *       - users
 *     summary: Cria uma nova conta de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpInput'
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro no servidor
 * 
 */

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       - users
 *     summary: Faz login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
