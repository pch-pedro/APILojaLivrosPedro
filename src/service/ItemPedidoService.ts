import { PedidoRepository } from '../repository/PedidoRepository';
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 
import { PedidoStatus } from '../enums/PedidoStatus';

export class ItemPedidoService {
    private readonly pedidoRepository: PedidoRepository;

    constructor(pedidoRepository = PedidoRepository.getInstance()) {
        this.pedidoRepository = pedidoRepository as any;
    }
    
    async removeItemDoPedido(itemId: number): Promise<void> {
        const item = await this.pedidoRepository.buscarItemPorId(itemId);
        
        if (!item) {
            throw new NotFoundError(`Item de Pedido com ID ${itemId} não encontrado.`);
        }

        const pedido = await this.pedidoRepository.buscarPorId(item.pedido_id);
        
        if (!pedido) {
             throw new Error("Falha de integridade: Pedido pai não encontrado.");
        }

        if (pedido.status_pedido !== PedidoStatus.PENDENTE) {
            throw new ConflictError(`Não é possível remover itens de pedidos com status ${pedido.status_pedido}.`);
        }
        await this.pedidoRepository.removerItem(itemId);
    }
}