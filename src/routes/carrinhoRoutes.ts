import { Router, Request, Response, NextFunction } from 'express';
import { CarrinhoService } from '../service/CarrinhoService'; 
import { PedidoView } from '../view/PedidoView'; 
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 
import { CarrinhoRequestDto } from '../model/dto/CarrinhoRequestDto';

const router = Router();
const carrinhoService = new CarrinhoService(); 

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
    return res.status(statusCode).json(PedidoView.formatarErro(err.message || defaultMessage, statusCode));
};

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    try {
        const data: CarrinhoRequestDto = req.body;
        const itemAtualizado = await carrinhoService.addItem(data);
        
        return res.status(201).json(PedidoView.formatarSucesso(itemAtualizado, 'Item adicionado/atualizado no carrinho.', 201));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));

router.get('/:usuarioId', asyncHandler(async (req: Request, res: Response) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);

        if (isNaN(usuarioId) || usuarioId <= 0) {
            throw new ValidationError('ID de Usuário inválido.');
        }

        const itensCarrinho = await carrinhoService.getCarrinho(usuarioId);
        
        return res.status(200).json(PedidoView.formatarSucesso(itensCarrinho, 'Carrinho retornado com sucesso.', 200));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));

router.put('/:usuarioId/item/:livroId', asyncHandler(async (req: Request, res: Response) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        const livroId = parseInt(req.params.livroId, 10);
        
        const { quantidade } = req.body as { quantidade: number }; 

        if (quantidade === undefined || isNaN(quantidade)) {
             throw new ValidationError('A quantidade deve ser fornecida no corpo da requisição.');
        }

        const itemAtualizado = await carrinhoService.updateItemQuantity(usuarioId, livroId, quantidade);
        
        if (!itemAtualizado) {
            return res.status(200).json(PedidoView.formatarSucesso(null, "Item removido do carrinho (quantidade definida como 0).", 200));
        }

        return res.status(200).json(PedidoView.formatarSucesso(itemAtualizado, 'Quantidade do item atualizada.', 200));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));


router.delete('/:usuarioId/item/:livroId', asyncHandler(async (req: Request, res: Response) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        const livroId = parseInt(req.params.livroId, 10);

        const successDelete = await carrinhoService.removeItem(usuarioId, livroId);
        
        if (!successDelete) {
            throw new NotFoundError("Item não encontrado no carrinho para remoção.");
        }
        return res.status(200).json(PedidoView.formatarSucesso(null, "Item removido do carrinho com sucesso.", 200));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));


export default router;
