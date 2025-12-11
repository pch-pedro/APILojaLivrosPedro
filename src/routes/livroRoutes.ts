import { Router, Request, Response, NextFunction } from 'express';
import { LivroView } from '../view/LivroView'; 
import { LivroService } from '../service/LivroService';
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 

const router = Router();
const livroService = new LivroService(); 


const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

const handleServiceError = (err: any, res: Response) => {
    const defaultMessage = 'Erro interno do servidor.';
    let statusCode = 500;

    if (err instanceof NotFoundError) {
        statusCode = 404;
    } else if (err instanceof ValidationError) {
        statusCode = 400; 
    } else if (err instanceof ConflictError) {
        statusCode = 409;
    }
    
    return res.status(statusCode).json(LivroView.formatarErro(err.message || defaultMessage, statusCode));
};


// POST /livros - criar novo livro
router.post('/', asyncHandler(async (req: Request, res: Response) => {
    try{
        const data = req.body;
        const livro = await livroService.novoLivro(data); 
        
        return res.status(201).json(LivroView.formatarSucesso(LivroView.formatarLivro(livro), 'Livro criado com sucesso', 201));
    } catch(err: any){
        handleServiceError(err, res);
    }
}));

// GET /livros - listar todos os livros
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    try{
        const livros = await livroService.listarLivros();
        
        return res.status(200).json(LivroView.formatarSucesso(LivroView.formatarListaLivros(livros), 'Livros listados com sucesso', 200));
    } catch(err: any){
        handleServiceError(err, res);
    }
}));

// GET /livros/isbn/:isbn - buscar livro pelo ISBN
router.get('/isbn/:isbn', asyncHandler(async (req: Request, res: Response) => {
    try{
        const isbn = String(req.params.isbn);
        const livro = await livroService.filtrarLivroPorISBN(isbn); 
        
        if (!livro) {
            throw new NotFoundError("Livro não encontrado pelo ISBN informado.");
        }
        return res.status(200).json(LivroView.formatarSucesso(LivroView.formatarLivro(livro), "Livro encontrado pelo ISBN", 200));
    }
    catch(err: any){
        handleServiceError(err, res);
    }
}));

// GET /livros/:id - buscar livro por id
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const livro = await livroService.filtrarLivro({id});
        
        return res.status(200).json(LivroView.formatarSucesso(LivroView.formatarLivro(livro), "Livro encontrado pelo ID", 200));
    }
    catch(err: any){
        handleServiceError(err, res);
    }
}))

// PUT /livros/:id - atualizar livro
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const novosDados = req.body;
        
        const atualizado = await livroService.atualizaLivro({ id, novosDados }); 
        
        if (!atualizado) {
            throw new NotFoundError('Livro não encontrado para atualização.');
        }

        return res.status(200).json(LivroView.formatarSucesso(LivroView.formatarLivro(atualizado), 'Livro atualizado com sucesso', 200));
    } catch(err: any){
        handleServiceError(err, res);
    }
}));

// DELETE /livros/:id - remover livro
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const removido = await livroService.removeLivro(id);
        
        return res.status(200).json(LivroView.formatarSucesso(LivroView.formatarLivro(removido), 'Livro removido com sucesso', 200));
    } catch(err: any){
        handleServiceError(err, res);
    }
}));

export default router;