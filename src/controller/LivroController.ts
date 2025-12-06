import type { Request, Response } from 'express';
import LivroServiceDefault, { LivroService } from '../service/LivroService';
import { LivroView } from '../view/LivroView';

export class LivroController{
    private livroService: LivroService;

    constructor(){
        this.livroService = LivroServiceDefault as unknown as LivroService;
    }

    async criarLivro(req: Request, res: Response): Promise<void>{
        try{
            const data = req.body;
            const livro = await this.livroService.novoLivro(data);
            res.status(201).json(LivroView.formatarSucesso(
                LivroView.formatarLivro(livro),
                'Livro criado com sucesso',
                201
            ));
        } catch(err: any){
            res.status(400).json(LivroView.formatarErro(err.message || 'Erro ao criar livro', 400));
        }
    }

    async filtrarLivro(req: Request, res: Response): Promise<void>{
        try{
            const id = Number(req.params.id || req.body.id);
            const livro = await this.livroService.filtrarLivro({ id });
            if (!livro) {
                res.status(404).json(LivroView.formatarErro('Livro não encontrado', 404));
                return;
            }
            res.json(LivroView.formatarSucesso(
                LivroView.formatarLivro(livro),
                'Livro encontrado',
                200
            ));
        } catch(err: any){
            res.status(404).json(LivroView.formatarErro(err.message || 'Livro não encontrado', 404));
        }
    }

    async listarLivros(req: Request, res: Response): Promise<void>{
        try{
            const livros = await this.livroService.listarLivros();
            res.json(LivroView.formatarSucesso(
                LivroView.formatarListaLivros(livros),
                'Livros listados com sucesso',
                200
            ));
        } catch(err: any){
            res.status(500).json(LivroView.formatarErro(err.message || 'Erro ao listar livros', 500));
        }
    }

    async removerLivro(req: Request, res: Response): Promise<void>{
        try{
            const id = Number(req.params.id);
            const removido = await this.livroService.removeLivro(id);
            res.json(LivroView.formatarSucesso(
                LivroView.formatarLivro(removido),
                'Livro removido com sucesso',
                200
            ));
        } catch(err: any){
            res.status(404).json(LivroView.formatarErro(err.message || 'Erro ao remover livro', 404));
        }
    }

    async atualizaLivro(req: Request, res: Response): Promise<void>{
        try{
            const id = Number(req.params.id || req.body.id);
            const novosDados = req.body.novosDados || req.body;
            const atualizado = await this.livroService.atualizaLivro({ id, novosDados });
            if (!atualizado) {
                res.status(404).json(LivroView.formatarErro('Livro não encontrado', 404));
                return;
            }
            res.json(LivroView.formatarSucesso(
                LivroView.formatarLivro(atualizado),
                'Livro atualizado com sucesso',
                200
            ));
        } catch(err: any){
            res.status(400).json(LivroView.formatarErro(err.message || 'Erro ao atualizar livro', 400));
        }
    }
}

export default new LivroController();