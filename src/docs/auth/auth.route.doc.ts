/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Autenticação e gerenciamento de sessão
 */

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar usuário e empresa
 *     description: Cria uma nova conta de usuário vinculada a uma empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       409:
 *         description: Usuário já existe
 */

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login do usuário
 *     description: Autentica o usuário e gera tokens JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Renovar access token
 *     description: Gera novos tokens usando refresh token salvo nos cookies
 *     responses:
 *       200:
 *         description: Tokens renovados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthRefreshResponse'
 *       401:
 *         description: Refresh token inválido
 */

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout do usuário
 *     description: Remove tokens armazenados em cookies
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Solicitar redefinição de senha
 *     description: Gera token temporário para reset de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthForgotPassword'
 *     responses:
 *       200:
 *         description: Email enviado com sucesso
 */

/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Redefinir senha
 *     description: Atualiza a senha usando token de recuperação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthResetPassword'
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       401:
 *         description: Token inválido ou expirado
 */
