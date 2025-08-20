# Administração de Usuários - LAVI

## Configuração

Para usar a página de administração de usuários, você precisa configurar uma variável de ambiente:

1. Crie ou edite o arquivo `.env` na raiz do projeto
2. Adicione a seguinte linha:

```env
ADMIN_SENHA=sua_senha_secreta_aqui
```

**IMPORTANTE**: Substitua `sua_senha_secreta_aqui` por uma senha forte e segura.

## Como usar

### 1. Acessar a página de login

- Navegue para `/admin-usuarios`
- Digite a senha configurada na variável de ambiente `ADMIN_SENHA`

### 2. Gerenciar usuários

Após fazer login, você será redirecionado para `/admin-usuarios/gerenciar` onde poderá:

- **Visualizar** todos os usuários cadastrados
- **Editar** informações dos usuários:
  - Nome
  - Email
  - Função (admin ou usuário)
  - Status (ativo ou inativo)
- **Excluir** usuários (com confirmação)

## Funcionalidades

### Segurança

- Autenticação por senha armazenada em variável de ambiente
- Cookies de sessão para manter o usuário logado
- **Proteção de rotas**: Página de gerenciamento só acessível após login
- **Redirecionamento automático**: Usuários não autenticados são redirecionados para login
- Validação de dados antes de salvar
- Verificação de email único
- **Logout seguro**: Remove cookies de autenticação

### Interface

- Design responsivo com Tailwind CSS
- Tabela organizada com todas as informações dos usuários
- Edição inline para facilitar as alterações
- Confirmação antes de excluir usuários

## Estrutura dos arquivos

```
src/app/admin-usuarios/
├── page.tsx                    # Página de login
└── gerenciar/
    └── page.tsx               # Página de gerenciamento

src/app/api/admin/usuarios/
├── route.ts                   # API para listar usuários
├── verificar-senha/
│   └── route.ts              # API para verificar senha
├── verificar-sessao/
│   └── route.ts              # API para verificar sessão ativa
├── logout/
│   └── route.ts              # API para fazer logout
└── [id]/
    └── route.ts              # API para editar/excluir usuários
```

## Modelo de dados

A página utiliza o modelo `Usuarios` do Prisma com os seguintes campos:

- `id`: Identificador único
- `nome`: Nome do usuário
- `email`: Email único do usuário
- `role`: Função (admin ou usuário)
- `ativo`: Status ativo/inativo
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização

## Dependências

Certifique-se de que as seguintes dependências estão instaladas:

```bash
npm install @prisma/client bcryptjs
```

## Banco de dados

Execute as migrações do Prisma para garantir que a tabela `usuarios` existe:

```bash
npx prisma migrate dev
npx prisma generate
```
