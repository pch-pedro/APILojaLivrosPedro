import { Router } from 'express';
import LivroController from '../controller/LivroController';

const router = Router();

// POST /livros - criar novo livro
router.post('/', (req, res) => LivroController.criarLivro(req, res));

// GET /livros - listar todos os livros
router.get('/', (req, res) => LivroController.listarLivros(req, res));

// GET /livros/:id - buscar livro por id
router.get('/:id', (req, res) => LivroController.filtrarLivro(req, res));

// PUT /livros/:id - atualizar livro
router.put('/:id', (req, res) => LivroController.atualizaLivro(req, res));

// DELETE /livros/:id - remover livro
router.delete('/:id', (req, res) => LivroController.removerLivro(req, res));

export default router;
