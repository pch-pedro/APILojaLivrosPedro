"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LivroView_1 = require("../view/LivroView");
const LivroService_1 = require("../service/LivroService");
const errors_1 = require("../utils/errors");
const router = (0, express_1.Router)();
const livroService = new LivroService_1.LivroService();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const handleServiceError = (err, res) => {
    const defaultMessage = 'Erro interno do servidor.';
    let statusCode = 500;
    if (err instanceof errors_1.NotFoundError) {
        statusCode = 404;
    }
    else if (err instanceof errors_1.ValidationError) {
        statusCode = 400;
    }
    else if (err instanceof errors_1.ConflictError) {
        statusCode = 409;
    }
    return res.status(statusCode).json(LivroView_1.LivroView.formatarErro(err.message || defaultMessage, statusCode));
};
// POST /livros - criar novo livro
router.post('/', asyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const livro = await livroService.novoLivro(data);
        return res.status(201).json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(livro), 'Livro criado com sucesso', 201));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// GET /livros - listar todos os livros
router.get('/', asyncHandler(async (req, res) => {
    try {
        const livros = await livroService.listarLivros();
        return res.status(200).json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarListaLivros(livros), 'Livros listados com sucesso', 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// GET /livros/isbn/:isbn - buscar livro pelo ISBN
router.get('/isbn/:isbn', asyncHandler(async (req, res) => {
    try {
        const isbn = String(req.params.isbn);
        const livro = await livroService.filtrarLivroPorISBN(isbn);
        if (!livro) {
            throw new errors_1.NotFoundError("Livro não encontrado pelo ISBN informado.");
        }
        return res.status(200).json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(livro), "Livro encontrado pelo ISBN", 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// GET /livros/:id - buscar livro por id
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = Number(req.params.id);
        const livro = await livroService.filtrarLivro({ id });
        return res.status(200).json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(livro), "Livro encontrado pelo ID", 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// PUT /livros/:id - atualizar livro
router.put('/:id', asyncHandler(async (req, res) => {
    try {
        const id = Number(req.params.id);
        const novosDados = req.body;
        const atualizado = await livroService.atualizaLivro({ id, novosDados });
        if (!atualizado) {
            throw new errors_1.NotFoundError('Livro não encontrado para atualização.');
        }
        return res.status(200).json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(atualizado), 'Livro atualizado com sucesso', 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// DELETE /livros/:id - remover livro
router.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const id = Number(req.params.id);
        const removido = await livroService.removeLivro(id);
        return res.status(200).json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(removido), 'Livro removido com sucesso', 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
exports.default = router;
