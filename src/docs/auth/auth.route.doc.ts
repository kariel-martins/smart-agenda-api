/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: 🔐 Autenticação e criação de contas
 */
/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 📝 Criar nova conta
 *     description: Cria uma nova conta de usuário na plataforma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *       201:
 *         description: ✅ Conta criada com sucesso
 *       400:
 *         description: ❌ Dados inválidos
 *       409:
 *         description: ⚠️ Usuário já existe
 *       500:
 *         description: 🚨 Erro interno do servidor
 */
 /**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 🔑 Login do usuário
 *     description: Realiza autenticação e retorna token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *             
 *     responses:
 *       200:
 *         description: ✅ Login realizado com sucesso
 *       401:
 *         description: ❌ Email ou senha inválidos
 *       400:
 *         description: ❌ Dados inválidos
 *       500:
 *         description: 🚨 Erro interno
 */
/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 🚪 Deslogar o usuário!
 *     description: Remove o acesso do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             
 *     responses:
 *       200:
 *         description: ✅ Acesso removido com sucesso!
 *       401:
 *         description: ❌ Token inválido ou expirado
 *       500:
 *         description: 🚨 Erro interno
 */
/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 🔓 Atualiza o acesso do usuário!
 *     description: Atualiza o acesso do usuário sem precisar logar novamente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             
 *     responses:
 *       200:
 *         description: ✅ Acesso atualizado com sucesso!
 *       401:
 *         description: ❌ Token inválido ou expirado
 *       500:
 *         description: 🚨 Erro interno
 */
 /**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 📩 Usuário esqueceu a senha!
 *     description: Enviar email e retorna token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgotPasswordInput'
 *             
 *     responses:
 *       200:
 *         description: ✅ Email enviado com sucesso!
 *       401:
 *         description: ❌ Email ou senha inválidos
 *       400:
 *         description: ❌ Dados inválidos ou usuário não existe
 *       500:
 *         description: 🚨 Erro interno
 */
 /**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 🔐 Atualizar a senha!
 *     description: Enviar email e atualizar a senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/resetPasswordInput'
 *             
 *     responses:
 *       200:
 *         description: ✅ Senha atualida com sucesso!
 *       401:
 *         description: ❌ Token inválido ou expirado
 *       400:
 *         description: ❌ Dados inválidos ou usuário não existe
 *       500:
 *         description: 🚨 Erro interno
 */
 