"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LivroService_1 = __importDefault(require("../service/LivroService"));
const LivroView_1 = require("../view/LivroView");
const router = (0, express_1.Router)();
// POST /livros - criar novo livro
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const livro = await LivroService_1.default.novoLivro(data);
        return res.status(201).json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(livro), 'Livro criado com sucesso', 201));
    }
    catch (err) {
        return res.status(400).json(LivroView_1.LivroView.formatarErro(err.message || 'Erro ao criar livro', 400));
    }
});
// GET /livros - listar todos os livros
router.get('/', async (req, res) => {
    try {
        const livros = await LivroService_1.default.listarLivros();
        return res.json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarListaLivros(livros), 'Livros listados com sucesso', 200));
    }
    catch (err) {
        return res.status(500).json(LivroView_1.LivroView.formatarErro(err.message || 'Erro ao listar livros', 500));
    }
});
// GET /livros/isbn/:isbn - buscar livro pelo ISBN
router.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = String(req.params.isbn);
        const livro = await LivroService_1.default.filtrarLivroISBN(isbn);
        if (!livro) {
            return res.status(404).json(LivroView_1.LivroView.formatarErro("Livro nao encontrado pelo ISBN informado", 404));
        }
        return res.json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(livro), "Livro encontrado pelo ISBN", 200));
    }
    catch (err) {
        return res.status(404).json(LivroView_1.LivroView.formatarErro(err.message || "Livro nao encontrado pelo ISBN no sistema", 404));
    }
});
// GET /livros/:id - buscar livro por id
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const livro = await LivroService_1.default.filtrarLivro({ id });
        if (!livro) {
            return res.status(404).json(LivroView_1.LivroView.formatarErro("Livro nao encontrado pelo ID", 404));
        }
        return res.json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(livro), "Livro encontrado pelo ID", 200));
    }
    catch (err) {
        return res.status(404).json(LivroView_1.LivroView.formatarErro(err.message || "Livro nao encontrado", 404));
    }
});
// PUT /livros/:id - atualizar livro
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const novosDados = req.body;
        const atualizado = await LivroService_1.default.atualizaLivro({ id, novosDados });
        if (!atualizado) {
            return res.status(404).json(LivroView_1.LivroView.formatarErro('Livro não encontrado', 404));
        }
        return res.json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(atualizado), 'Livro atualizado com sucesso', 200));
    }
    catch (err) {
        return res.status(400).json(LivroView_1.LivroView.formatarErro(err.message || 'Erro ao atualizar livro', 400));
    }
});
// DELETE /livros/:id - remover livro
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const removido = await LivroService_1.default.removeLivro(id);
        return res.json(LivroView_1.LivroView.formatarSucesso(LivroView_1.LivroView.formatarLivro(removido), 'Livro removido com sucesso', 200));
    }
    catch (err) {
        return res.status(404).json(LivroView_1.LivroView.formatarErro(err.message || 'Erro ao remover livro', 404));
    }
});
exports.default = router;
