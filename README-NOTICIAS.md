# Sistema de Notícias LAVI

Sistema completo de notícias com editor de texto rico integrado ao projeto LAVI.

## ✨ Funcionalidades Implementadas

### 📰 Página Principal (Sobre)

- **Grid 2x3**: Exibe as 6 principais notícias em formato de grade
- **Design Responsivo**: Adapta-se automaticamente a diferentes telas
- **Botão "Ver Todas"**: Link para página com todas as notícias
- **Modal Detalhado**: Visualização completa de cada notícia
- **Suporte HTML Rico**: Renderiza conteúdo formatado com HTML

### 📄 Página "Todas as Notícias"

- **Visualização Completa**: Lista todas as notícias criadas
- **Paginação**: 12 itens por página com navegação
- **Estatísticas**: Contador de total de notícias e páginas
- **Layout em Cards**: Design moderno e responsivo
- **Busca Visual**: Fácil identificação das notícias

### ✏️ Editor de Texto Rico

- **Formatação Completa**: Negrito, itálico, sublinhado, títulos
- **Inserção de Imagens**: URL de imagens com preview
- **Criação de Tabelas**: Gerador automático de tabelas HTML
- **Links**: Inserção de links externos
- **Listas**: Numeradas e com marcadores
- **Alinhamento**: Esquerda, centro, direita
- **Limpeza**: Remover formatação

### 🛠 Painel Administrativo

- **Interface Modernizada**: Design atualizado para notícias
- **Editor Visual**: Substituição do textarea por editor WYSIWYG
- **Preview em Tempo Real**: Visualização do conteúdo formatado
- **Gerenciamento Completo**: Criar, editar, deletar notícias

## 🎯 Como Usar

### 1. Criando uma Notícia

1. Acesse `/admin/sobre`
2. Preencha título e descrição
3. Use o editor rico para o conteúdo:
   - **Texto**: Digite normalmente
   - **Formatação**: Use os botões da toolbar
   - **Imagens**: Clique em 🖼 e insira URL
   - **Tabelas**: Clique em ⊞ e defina dimensões
   - **Links**: Clique em 🔗 e insira URL
4. Adicione imagem principal (opcional)
5. Salve a notícia

### 2. Visualizando na Página Inicial

- As **6 primeiras** notícias aparecem no grid 2x3
- Clique em qualquer notícia para ver detalhes
- Use "Ver Todas as Notícias" para a lista completa

### 3. Formatação Avançada no Editor

#### Títulos

```html
H1 - Título Principal H2 - Subtítulo H3 - Título de Seção P - Parágrafo Normal
```

#### Texto Rico

- **Negrito**: Selecione texto + botão B
- **Itálico**: Selecione texto + botão I
- **Links**: Selecione texto + botão 🔗

#### Tabelas

1. Clique no botão ⊞
2. Digite número de linhas e colunas
3. Tabela será inserida automaticamente
4. Clique nas células para editar

#### Imagens

1. Clique no botão 🖼
2. Cole URL da imagem
3. Imagem será inserida no texto

## 🎨 Recursos Visuais

### Design System

- **Cores**: Gradientes azul/índigo para elementos primários
- **Tipografia**: Hierarquia clara com títulos em destaque
- **Spacing**: Espaçamentos consistentes entre elementos
- **Shadows**: Sombras suaves para profundidade
- **Animations**: Animações suaves de entrada

### Responsividade

- **Mobile**: 1 coluna no grid
- **Tablet**: 2 colunas no grid
- **Desktop**: 3 colunas no grid
- **Modal**: Adapta-se ao tamanho da tela

## 🔧 Estrutura Técnica

### Componentes

```
src/app/Components/
├── Sobre.tsx              # Grid 2x3 + Modal
├── RichTextEditor.tsx     # Editor WYSIWYG
└── ...

src/app/
├── sobre/page.tsx         # Página principal
├── todas-noticias/page.tsx # Lista completa
└── admin/sobre/page.tsx   # Painel admin
```

### APIs (Existentes)

- `GET /api/admin/sobre` - Listar notícias
- `POST /api/admin/sobre` - Criar notícia
- `PUT /api/admin/sobre/[id]` - Atualizar
- `DELETE /api/admin/sobre/[id]` - Deletar

### Banco de Dados

```sql
-- Utiliza tabela 'sobre' existente
-- Campos: id, titulo, descricao, conteudo (HTML), imagem_principal, created_at, updated_at
```

## 📱 URLs do Sistema

| Página         | URL               | Descrição               |
| -------------- | ----------------- | ----------------------- |
| Home Notícias  | `/sobre`          | Grid 2x3 das principais |
| Todas Notícias | `/todas-noticias` | Lista paginada completa |
| Admin          | `/admin/sobre`    | Painel de gerenciamento |

## 🚀 Próximos Passos

Para expandir o sistema:

1. **Categorias**: Adicionar sistema de categorias
2. **Busca**: Implementar busca por texto
3. **SEO**: Meta tags dinâmicas para notícias
4. **RSS**: Feed RSS das notícias
5. **Comentários**: Sistema de comentários
6. **Compartilhamento**: Botões de redes sociais

## ⚡ Performance

- **Renderização HTML**: `dangerouslySetInnerHTML` para conteúdo rico
- **Lazy Loading**: Imagens carregadas conforme necessário
- **Paginação**: Evita carregar muitas notícias de uma vez
- **CSS Otimizado**: Classes Tailwind para tamanho mínimo

---

**Desenvolvido com ❤️ para o projeto LAVI**
