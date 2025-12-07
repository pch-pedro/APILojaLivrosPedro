"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroModel_1 = require("../model/entity/LivroModel");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    async novoLivro(data) {
        const isbn = data.isbn;
        if (!isbn || !this.livroRepository.validacaoISBN(isbn)) {
            throw new Error("É necessário 13 dígitos válidos de ISBN para cadastrar um livro!");
        }
        if (await this.livroRepository.validacaoLivroPorISBN(isbn)) {
            throw new Error("Este livro já é cadastrado!");
        }
        // construir modelo
        const livro = new LivroModel_1.LivroModel(data.categoria_id, data.titulo, data.isbn, data.preco, data.estoque, data.sinopse, data.imageURL, data.autor, data.editora, data.data_publicacao ? new Date(data.data_publicacao) : new Date());
        return await this.livroRepository.insereLivro(livro);
    }
    async filtrarLivro(data) {
        const id = data.id;
        const livro = await this.livroRepository.filtraLivroPorId(id);
        if (livro === null) {
            throw new Error("Id não encontrado no sistema!");
        }
        return livro;
    }
    async filtrarLivroPorISBN(isbn) {
        const livro = await this.livroRepository.filtraLivroPorISBN(isbn);
        if (!livro) {
            throw new Error('ISBN não encontrado no sistema!');
        }
        return livro;
    }
    //Função Adicionada: Filtrar Livro por ISBN
    async filtrarLivroISBN(data) {
        const isbn = data.isbn;
        if (this.livroRepository.validacaoISBN(isbn) === false) {
            throw new Error("O ISBN informado eh invalido. Eh necessário 13 caracteres");
        }
        const livro = await this.livroRepository.filtraLivroPorISBN(isbn);
        if (livro === null) {
            throw new Error("Livro com o ISBN:" + isbn + "nao encontrado no sistema");
        }
        return livro;
    }
    async removeLivro(id) {
        const livroRemovido = await this.livroRepository.removeLivroPorId(id);
        if (!livroRemovido) {
            throw new Error("Livro não encontrado para remoção!");
        }
        return livroRemovido;
    }
    async listarLivros() {
        return await this.livroRepository.listarLivros();
    }
    async atualizaLivro(data) {
        const id = data.id;
        const novosDados = data.novosDados;
        return await this.livroRepository.atualizarLivroPorId(id, novosDados);
    }
}
exports.LivroService = LivroService;
exports.default = new LivroService();
