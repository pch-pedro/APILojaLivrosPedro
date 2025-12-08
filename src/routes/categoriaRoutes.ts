import { Router, Request, Response } from 'express';
import { CategoriaService } from '../service/CategoriaService';
import { CategoriaView } from '../view/CategoriaView';
import { CategoriaModel } from '../model/entity/CategoriaModel';

const router = Router();
const categoriaService = new CategoriaService();

// POST /categorias- criar nova categoria
router.post('/', async (req: Request, res: Response) => {
    try{
        const data = req.body;
        const categoria = await categoriaService.novaCategoria(data);
        return res.status(201).json(CategoriaView.formatarSucesso(CategoriaView.formatarCategoria(categoria), 'Categoria criada com sucesso', 201));
    } catch(err: any){
        return res.status(400).json(CategoriaView.formatarErro(err.message || 'Erro ao criar categoria', 400));
    }
});

// GET /categorias - listar todas as categorias
router.get('/', async (req: Request, res: Response) => {
	try{
		const categorias = await categoriaService.listarCategoria();
		return res.json(CategoriaView.formatarSucesso(CategoriaView.formatarListaCategoria(categorias), "Categorias listadas com sucesso", 200));
	} catch(err: any){
		return res.status(500).json(CategoriaView.formatarErro(err.message || 'Erro ao listar livros', 500));
	}
});

// GET /categorias/:id - listar categoria pelo ID
router.get('/:id', async(req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(
                CategoriaView.formatarErro("ID invalido", 400)
            );
        }

        const categoria = await categoriaService.listarCategoriaPorId(id);

        return res.status(200).json(CategoriaView.formatarSucesso(CategoriaView.formatarCategoria(categoria), "Categoria encontrada com sucesso", 200));
    }catch(err: any){
        return res.status(404).json(CategoriaView.formatarErro(err.message || "Categoria nao encontrada", 404));
    }
})

// PUT /categorias/:id - atualizar livro
router.put('/:id', async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(CategoriaView.formatarErro("ID invalido", 400));
        }

        const novosDados = req.body;

        if(!novosDados.nome){
            return res.status(400).json(CategoriaView.formatarErro("Eh necessario informar o nome da categoria", 400));
        }

        const categoriaAtualizada = await categoriaService.atualizaCategoria(id, {nome: novosDados.nome});

        return res.status(200).json(CategoriaView.formatarSucesso(CategoriaView.formatarCategoria(categoriaAtualizada), "Categoria atualizada com sucesso", 200));
    } catch(err: any){
        return res.status(400).json(CategoriaView.formatarErro(err.message || "Erro ao atualizar categoria", 400));
    }
});

// DELETE /categorias/:id - remover livro
router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(CategoriaView.formatarErro("ID invalido", 400));
        }

        const removido = await categoriaService.removeCategoria(id);

        return res.json(CategoriaView.formatarSucesso(CategoriaView.formatarCategoria(removido), "Categoria removida com sucesso", 200));
    } catch(err: any){
        return res.status(404).json(CategoriaView.formatarErro(err.message || 'Erro ao remover categoria', 404));
    }
});

export default router;