"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroModel_1 = require("../model/entity/LivroModel");
const LivroRepository_1 = require("../repository/LivroRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const errors_1 = require("../utils/errors");
class LivroService {
    livroRepository;
    usuarioRepository;
    constructor(livroRepository = LivroRepository_1.LivroRepository.getInstance(), usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance()) {
        this.livroRepository = livroRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async getLivroRepository() {
        return await this.livroRepository;
    }
    async novoLivro(data) {
        const repo = await this.getLivroRepository();
        const isbn = data.isbn;
        if (!isbn || !repo.validacaoISBN(isbn)) {
            throw new errors_1.ValidationError("É necessário 13 dígitos válidos de ISBN para cadastrar um livro!");
        }
        if (await repo.validacaoLivroPorISBN(isbn)) {
            throw new errors_1.ConflictError("Este livro já é cadastrado!");
        }
        const livro = new LivroModel_1.LivroModel(data.categoria_id, data.titulo, data.autor, data.isbn, data.preco, data.estoque, data.sinopse, data.imageURL, data.editora, data.data_publicacao ? new Date(data.data_publicacao) : new Date(), data.promocao);
        return await repo.insereLivro(livro);
    }
    async filtrarLivro(data) {
        const repo = await this.getLivroRepository();
        const id = data.id;
        const livro = await repo.filtraLivroPorId(id);
        if (livro === null) {
            throw new errors_1.NotFoundError("Id não encontrado no sistema!");
        }
        return livro;
    }
    async filtrarLivroPorISBN(isbn) {
        const repo = await this.getLivroRepository();
        const livro = await repo.filtraLivroPorISBN(isbn);
        if (!livro) {
            throw new errors_1.NotFoundError('ISBN não encontrado no sistema!');
        }
        return livro;
    }
    async filtrarLivroISBN(data) {
        const repo = await this.getLivroRepository();
        const isbn = data.isbn;
        if (repo.validacaoISBN(isbn) === false) {
            throw new errors_1.ValidationError("O ISBN informado é inválido. É necessário 13 caracteres");
        }
        const livro = await repo.filtraLivroPorISBN(isbn);
        if (livro === null) {
            throw new errors_1.NotFoundError("Livro com o ISBN:" + isbn + " não encontrado no sistema");
        }
        return livro;
    }
    async removeLivro(id) {
        const repo = await this.getLivroRepository();
        const livroRemovido = await repo.removeLivroPorId(id);
        if (!livroRemovido) {
            throw new errors_1.NotFoundError("Livro não encontrado para remoção!");
        }
        return livroRemovido;
    }
    async listarLivros() {
        const repo = await this.getLivroRepository();
        return await repo.listarLivros();
    }
    async atualizaLivro(data) {
        const repo = await this.getLivroRepository();
        const id = data.id;
        const novosDados = data.novosDados;
        if (novosDados.isbn && repo.validacaoISBN(novosDados.isbn) === false) {
            throw new errors_1.ValidationError("ISBN inválido. Precisa ter 13 dígitos");
        }
        if (novosDados.data_publicacao) {
            novosDados.data_publicacao = new Date(novosDados.data_publicacao);
        }
        return await repo.atualizarLivroPorId(id, novosDados);
    }
}
exports.LivroService = LivroService;
