import { Router, Request, Response } from 'express';
import LivroService from '../service/LivroService';
import { LivroView } from '../view/LivroView';

const router = Router();

// POST /livros - criar novo livro
router.post('/', async (req: Request, res: Response) => {
	try{
		const data = req.body;
		const livro = await LivroService.novoLivro(data);
		return res.status(201).json(LivroView.formatarSucesso(LivroView.formatarLivro(livro), 'Livro criado com sucesso', 201));
	} catch(err: any){
		return res.status(400).json(LivroView.formatarErro(err.message || 'Erro ao criar livro', 400));
	}
});

// GET /livros - listar todos os livros
router.get('/', async (req: Request, res: Response) => {
	try{
		const livros = await LivroService.listarLivros();
		return res.json(LivroView.formatarSucesso(LivroView.formatarListaLivros(livros), 'Livros listados com sucesso', 200));
	} catch(err: any){
		return res.status(500).json(LivroView.formatarErro(err.message || 'Erro ao listar livros', 500));
	}
});

// GET /livros/isbn/:isbn - buscar livro pelo ISBN
router.get('/isbn/:isbn', async (req: Request, res: Response) => {
	try{
		const isbn = String(req.params.isbn);
		const livro = await LivroService.filtrarLivroISBN(isbn);
		if(!livro){
			return res.status(404).json(LivroView.formatarErro("Livro nao encontrado pelo ISBN informado", 404));
		}
		return res.json(LivroView.formatarSucesso(LivroView.formatarLivro(livro), "Livro encontrado pelo ISBN", 200));
	}
	catch(err: any){
		return res.status(404).json(LivroView.formatarErro(err.message || "Livro nao encontrado pelo ISBN no sistema", 404));
	}
});

// GET /livros/:id - buscar livro por id
router.get('/:id', async (req: Request, res: Response) => {
	try{
		const id = Number(req.params.id);
		const livro = await LivroService.filtrarLivro({id});
		if(!livro){
			return res.status(404).json(LivroView.formatarErro("Livro nao encontrado pelo ID", 404));
		}
		return res.json(LivroView.formatarSucesso(LivroView.formatarLivro(livro), "Livro encontrado pelo ID", 200));
	}
	catch(err: any){
		return res.status(404).json(LivroView.formatarErro(err.message || "Livro nao encontrado", 404));
	}
})

// PUT /livros/:id - atualizar livro
router.put('/:id', async (req: Request, res: Response) => {
	try{
		const id = Number(req.params.id);
		const novosDados = req.body;
		const atualizado = await LivroService.atualizaLivro({ id, novosDados });
		if (!atualizado) {
			return res.status(404).json(LivroView.formatarErro('Livro não encontrado', 404));
		}
		return res.json(LivroView.formatarSucesso(LivroView.formatarLivro(atualizado), 'Livro atualizado com sucesso', 200));
	} catch(err: any){
		return res.status(400).json(LivroView.formatarErro(err.message || 'Erro ao atualizar livro', 400));
	}
});

// DELETE /livros/:id - remover livro
router.delete('/:id', async (req: Request, res: Response) => {
	try{
		const id = Number(req.params.id);
		const removido = await LivroService.removeLivro(id);
		return res.json(LivroView.formatarSucesso(LivroView.formatarLivro(removido), 'Livro removido com sucesso', 200));
	} catch(err: any){
		return res.status(404).json(LivroView.formatarErro(err.message || 'Erro ao remover livro', 404));
	}
});

export default router;