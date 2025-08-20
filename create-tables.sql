-- Criar tabelas do banco LAVI
-- Execute este arquivo no PostgreSQL

-- Tabela Equipe
CREATE TABLE equipe (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(255),
    email VARCHAR(255),
    foto VARCHAR(500),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Galeria
CREATE TABLE galeria (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    descricao TEXT,
    date TIMESTAMP,
    "imageUrl" VARCHAR(500),
    "imageAlt" VARCHAR(255),
    "imageWidth" INTEGER,
    "imageHeight" INTEGER,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Legislação
CREATE TABLE legislacao (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    links TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Orientação
CREATE TABLE orientacao (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    links TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Artefatos
CREATE TABLE artefatos (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    links TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Contatos
CREATE TABLE contatos (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    assunto VARCHAR(255),
    descricao TEXT,
    status VARCHAR(100) DEFAULT 'novo',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Usuários
CREATE TABLE usuarios (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    "senhaHash" VARCHAR(255) NOT NULL,
    role VARCHAR(100) DEFAULT 'admin',
    ativo BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Uploads
CREATE TABLE uploads (
    id VARCHAR(255) PRIMARY KEY,
    "nomeOriginal" VARCHAR(255) NOT NULL,
    "nomeArquivo" VARCHAR(255) NOT NULL,
    caminho VARCHAR(500) NOT NULL,
    tipo VARCHAR(100),
    tamanho INTEGER,
    "mimeType" VARCHAR(100),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Projetos
CREATE TABLE projetos (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(500) NOT NULL,
    nome_completo VARCHAR(500),
    ano INTEGER NOT NULL,
    descricao TEXT,
    participantes TEXT,
    status VARCHAR(100) DEFAULT 'ativo',
    imagem VARCHAR(500),
    link_externo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Publicações
CREATE TABLE publicacoes (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(500) NOT NULL,
    autores TEXT,
    ano INTEGER NOT NULL,
    revista_periodico VARCHAR(500),
    doi VARCHAR(255),
    link_externo VARCHAR(500),
    resumo TEXT,
    tipo VARCHAR(100) DEFAULT 'artigo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagem VARCHAR(500)
);

-- Tabela Sobre
CREATE TABLE sobre (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    conteudo TEXT,
    imagem_principal VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário admin padrão
INSERT INTO usuarios (id, nome, email, "senhaHash", role, ativo) 
VALUES ('admin-1', 'Administrador', 'admin@lavi.com', 'admin123', 'admin', true);
