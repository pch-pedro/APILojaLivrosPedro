import { Router, Request, Response, NextFunction } from 'express';
import { ItemPedidoService } from '../service/ItemPedidoService';
import { PedidoView } from '../view/PedidoView'; // Usamos a View do Pedido para formatação de erro/sucesso
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 

const router = Router();
const itemPedidoService = new ItemPedidoService(); 

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

const handleServiceError = (err: any, res: Response) => {
    let statusCode = 500;
    if (err instanceof NotFoundError) statusCode = 404;
    else if (err instanceof ValidationError) statusCode = 400;
    else if (err instanceof ConflictError) statusCode = 409;
    
    return res.status(statusCode).json(PedidoView.formatarErro(err.message || 'Erro interno.', statusCode));
};


router.delete('/:itemId', asyncHandler(async (req: Request, res: Response) => {
    try {
        const itemId = parseInt(req.params.itemId, 10);
        
        if (isNaN(itemId)) {
             throw new ValidationError("ID do Item de Pedido é inválido.");
        }
        await itemPedidoService.removeItemDoPedido(itemId);
        
        return res.status(200).json(PedidoView.formatarSucesso(null, `Item ${itemId} removido com sucesso.`, 200));
        
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));


export default router;
