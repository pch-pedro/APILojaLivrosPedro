"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const mysql_1 = require("../database/mysql");
const LivroModel_1 = require("../model/entity/LivroModel");
class LivroRepository {
    static instance;
    constructor() { }
    static async getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
            await this.instance.criarTable();
        }
        return this.instance;
    }
    mapToModel(row) {
        return new LivroModel_1.LivroModel(row.categoria_id, row.titulo, row.autor, row.isbn, row.preco, row.estoque, row.sinopse, row.imageURL, row.editora, row.data_publicacao, row.promocao, row.id);
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS Livro(
                id INT AUTO_INCREMENT PRIMARY KEY,
                categoria_id INT NOT NULL,
                titulo VARCHAR(255) NOT NULL,
                autor VARCHAR(255) NOT NULL,                
                isbn VARCHAR(13) NOT NULL UNIQUE,
                preco DECIMAL(10,2) NOT NULL,
                estoque INT NOT NULL,
                sinopse TEXT,
                imageURL VARCHAR(255),
                editora VARCHAR(255) NOT NULL,
                data_publicacao DATE,
                promocao BOOLEAN DEFAULT FALSE
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de Livro criada com Sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de livro: ', err);
        }
    }
    async insereLivro(livro) {
        //Validação Adicionada: Verificando se já há um livro com o mesmo título e ISBN no sistema
        const resultadoExistente = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Livro WHERE titulo = ? AND isbn = ?", [livro.titulo, livro.isbn]);
        if (resultadoExistente && resultadoExistente.length > 0) {
            throw new Error("Livro com este título e ISBN já existe!");
        }
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Livro (categoria_id, titulo, autor, isbn, preco, estoque, sinopse, imageURL, editora, data_publicacao, promocao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            livro.categoria_id,
            livro.titulo,
            livro.autor,
            livro.isbn,
            livro.preco,
            livro.estoque,
            livro.sinopse,
            livro.imageURL,
            livro.editora,
            livro.data_publicacao,
            livro.promocao
        ]);
        console.log("Livro criado com Sucesso: ", resultado);
        return new LivroModel_1.LivroModel(livro.categoria_id, livro.titulo, livro.autor, livro.isbn, livro.preco, livro.estoque, livro.sinopse, livro.imageURL, livro.editora, livro.data_publicacao, livro.promocao, resultado.insertId);
    }
    validacaoISBN(isbn) {
        return isbn.toString().length === 13;
    }
    async filtraLivroPorISBN(isbn) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Livro WHERE isbn = ? LIMIT 1", [isbn]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new LivroModel_1.LivroModel(row.categoria_id, row.titulo, row.autor, row.isbn, row.preco, row.estoque, row.sinopse, row.imageURL, row.editora, row.data_publicacao, row.promocao, row.id);
        }
        return null;
    }
    async filtraLivroPorId(id) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Livro WHERE id = ?", [id]);
        if (resultado && resultado.length > 0) {
            const user = resultado[0];
            return new LivroModel_1.LivroModel(user.categoria_id, user.titulo, user.autor, user.isbn, user.preco, user.estoque, user.sinopse, user.imageURL, user.editora, user.data_publicacao, user.promocao, user.id);
        }
        return null;
    }
    async filtrarLivrosPorIds(ids) {
        if (ids.length === 0)
            return [];
        const query = `
            SELECT id, titulo, preco, estoque, autor, categoria_id, isbn, sinopse, imageURL, editora, data_publicacao, promocao 
            FROM Livro 
            WHERE id IN (?)
        `;
        const [rows] = await (0, mysql_1.executarComandoSQL)(query, [ids]);
        return rows.map(this.mapToModel);
    }
    async validacaoLivroPorId(id) {
        const livro = await this.filtraLivroPorId(id);
        return livro !== null;
    }
    async validacaoLivroPorISBN(isbn) {
        const livro = await this.filtraLivroPorISBN(isbn);
        return livro !== null;
    }
    async removeLivroPorId(id) {
        const livro = await this.filtraLivroPorId(id);
        if (!livro) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM Livro where id = ?", [id]);
        return livro;
    }
    async atualizarLivroPorId(id, novosDados) {
        const campos = [];
        const valores = [];
        if (novosDados.categoria_id) {
            campos.push("categoria_id = ?");
            valores.push(novosDados.categoria_id);
        }
        if (novosDados.titulo) {
            campos.push("titulo = ?");
            valores.push(novosDados.titulo);
        }
        if (novosDados.autor) {
            campos.push("autor = ?");
            valores.push(novosDados.autor);
        }
        if (novosDados.isbn) {
            if (this.validacaoISBN(novosDados.isbn) === false) {
                throw new Error("ISBN invalida. Precisa ter 13 digitos");
            }
            const existente = await this.filtraLivroPorISBN(novosDados.isbn);
            if (existente && existente.id !== id) {
                throw new Error("Ja existe outro livro com este ISBN");
            }
            campos.push("isbn = ?");
            valores.push(novosDados.isbn);
        }
        if (novosDados.preco) {
            campos.push("preco = ?");
            valores.push(novosDados.preco);
        }
        if (novosDados.estoque !== undefined) {
            campos.push("estoque = ?");
            valores.push(novosDados.estoque);
        }
        if (novosDados.sinopse) {
            campos.push("sinopse = ?");
            valores.push(novosDados.sinopse);
        }
        if (novosDados.imageURL) {
            campos.push("imageURL = ?");
            valores.push(novosDados.imageURL);
        }
        if (novosDados.editora) {
            campos.push("editora = ?");
            valores.push(novosDados.editora);
        }
        if (novosDados.data_publicacao) {
            campos.push("data_publicacao = ?");
            valores.push(novosDados.data_publicacao);
        }
        if (novosDados.promocao !== undefined) {
            campos.push("promocao = ?");
            valores.push(novosDados.promocao);
        }
        if (campos.length === 0) {
            return await this.filtraLivroPorId(id);
        }
        const sql = `UPDATE Livro SET ${campos.join(", ")} WHERE id = ?`;
        valores.push(id);
        const resultado = await (0, mysql_1.executarComandoSQL)(sql, valores);
        console.log(resultado);
        return await this.filtraLivroPorId(id);
    }
    async atualizarEstoque(id, delta) {
        const query = `
            UPDATE Livro
            SET estoque = estoque + ?
            WHERE id = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [delta, id]);
        return resultado.affectedRows > 0;
    }
    async listarLivros() {
        //Validação Adicionada: Retornando os livros por ordem alfabética e apenas se seu estoque for maior que zero.
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Livro WHERE estoque > 0 ORDER BY titulo ASC", []);
        const livros = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const user = resultado[i];
                livros.push(new LivroModel_1.LivroModel(user.categoria_id, user.titulo, user.autor, user.isbn, user.preco, user.estoque, user.sinopse, user.imageURL, user.editora, user.data_publicacao, user.promocao, user.id));
            }
        }
        return livros;
    }
}
exports.LivroRepository = LivroRepository;
