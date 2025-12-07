-- Create tables for Lectus Database

CREATE TABLE Categoria (
    id INT GENERATED AS IDENTITY PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE Usuario (
    id INT GENERATED AS IDENTITY PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL, 
    email VARCHAR(150) NOT NULL UNIQUE, 
    senha_hash VARCHAR(255) NOT NULL, 
    telefone VARCHAR(20) NOT NULL, 
    tipo_usuario VARCHAR(20) NOT NULL DEFAULT 'CLIENTE'
);

CREATE TABLE Endereco (
    id INT GENERATED AS IDENTITY PRIMARY KEY, 
    usuario_id INT NOT NULL,
    cep VARCHAR(10) NOT NULL, 
    rua VARCHAR(100) NOT NULL, 
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    cidade VARCHAR(100) NOT NULL, 
    estado VARCHAR(50) NOT NULL, 
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
);

CREATE TABLE Livro (
    id INT GENERATED AS IDENTITY PRIMARY KEY,
    categoria_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL ,
    sinopse TEXT,
    image_url VARCHAR(255),
    data_publicacao DATE,
    status ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO', 
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);

CREATE TABLE Carrinho (
    id INT GENERATED AS IDENTITY PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    quantidade INT NOT NULL,
    data_adicao DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES Livro(id) ON DELETE CASCADE,
    UNIQUE KEY unique_item_carrinho (usuario_id, livro_id) 
);

CREATE TABLE Pedido (
    id INT GENERATED AS IDENTITY PRIMARY KEY,
    usuario_id INT NOT NULL,
    endereco_entrega_id INT NOT NULL,
    data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10, 2) NOT NULL,
    status_pedido ENUM('PROCESSANDO_PAGAMENTO', 'CONFIRMADO', 'CANCELADO') NOT NULL DEFAULT 'PROCESSANDO_PAGAMENTO',
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (endereco_entrega_id) REFERENCES Endereco(id)
);

CREATE TABLE ItemPedido (
    id INT GENERATED AS IDENTITY PRIMARY KEY,
    pedido_id INT NOT NULL,
    livro_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario_pago DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES Pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);