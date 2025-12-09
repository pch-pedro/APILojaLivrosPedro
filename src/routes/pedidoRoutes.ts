import { Router, Request, Response, NextFunction } from 'express';
import { PedidoService } from '../service/PedidoService'; 
import { PedidoView } from '../view/PedidoView';
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 
import { PedidoStatus } from '../enums/PedidoStatus';
import { LivroView } from '../view/LivroView';

const router = Router();
const pedidoService = new PedidoService(); 

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


// POST /pedido
router.post('/', asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = req.body; 
        const novoPedidoDto = await pedidoService.criarPedido(data);
        
        return res.status(201).json(PedidoView.formatarSucesso(PedidoView.formatarPedido(novoPedidoDto), 'Pedido criado e processado com sucesso!', 201));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));

// GET /pedido/usuario/:usuarioId
router.get('/usuario/:usuarioId', asyncHandler(async (req: Request, res: Response) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        const pedidos = await pedidoService.listarPedidosPorUsuario(usuarioId);
        
        return res.status(200).json(PedidoView.formatarSucesso(PedidoView.formatarListaPedidos(pedidos), 'Pedidos listados com sucesso', 200));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));


// GET /pedido/:id
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const pedido = await pedidoService.buscarPedidoPorId(id);
        
        return res.status(200).json(PedidoView.formatarSucesso(PedidoView.formatarPedido(pedido), "Pedido encontrado", 200));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));

// PUT /pedido/:id/status
router.put('/:id/status', asyncHandler(async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { status } = req.body as { status: PedidoStatus }; 

        const updatedPedido = await pedidoService.atualizarPedidoStatus(id, status);
        
        return res.status(200).json(PedidoView.formatarSucesso(
            PedidoView.formatarPedido(updatedPedido),
            `Status atualizado para ${status}`, 
            200
        ));
    } catch (err: any) {
        handleServiceError(err, res);
    }
}));

export default router;