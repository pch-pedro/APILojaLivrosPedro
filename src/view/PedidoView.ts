import { PedidoResponseDto, ItemPedidoResponseDto } from '../model/dto/PedidoResponseDto';
import { PedidoStatus } from '../enums/PedidoStatus';
import { FormaPagamento } from '../enums/FormaPagamento';


interface ItemPedidoFormatado {
    livroId: number;
    quantidade: number;
    precoUnitario: string; 
    subtotalItem: string;
}

interface PedidoFormatado {
    id: number;
    usuarioId: number;
    enderecoEntregaId: number;
    dataPedido: string; 
    valorTotal: string; 
    status: PedidoStatus;
    formaPagamento: FormaPagamento;
    itens: ItemPedidoFormatado[];
}

export class PedidoView {

    private static formatCurrency(value: number): string {
        if (typeof value !== 'number' || isNaN(value)) return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    public static formatarItemPedido(itemDto: ItemPedidoResponseDto): ItemPedidoFormatado {
        const subtotal = itemDto.quantidade * itemDto.preco_unitario_pago;

        return {
            livroId: itemDto.livro_id,
            quantidade: itemDto.quantidade,
            precoUnitario: PedidoView.formatCurrency(itemDto.preco_unitario_pago),
            subtotalItem: PedidoView.formatCurrency(subtotal),
        };
    }


    public static formatarPedido(pedidoDto: PedidoResponseDto): PedidoFormatado {
        const itensFormatados = pedidoDto.itens 
            ? pedidoDto.itens.map(item => PedidoView.formatarItemPedido(item))
            : [];

        return {
            id: pedidoDto.id,
            usuarioId: pedidoDto.usuario_id,
            enderecoEntregaId: pedidoDto.endereco_entrega_id,
            dataPedido: pedidoDto.data_pedido.toISOString(), 
            valorTotal: PedidoView.formatCurrency(pedidoDto.valor_total),
            status: pedidoDto.status_pedido,
            formaPagamento: pedidoDto.forma_pagamento,
            itens: itensFormatados,
        };
    }

    public static formatarListaPedidos(pedidosDto: PedidoResponseDto[]): object {
        const pedidosFormatados = pedidosDto.map(pedido => PedidoView.formatarPedido(pedido));
        
        return {
            total: pedidosDto.length,
            pedidos: pedidosFormatados
        };
    }


    public static formatarErro(mensagem: string, statusCode: number = 400): object {
        return {
            error: true,
            statusCode,
            message: mensagem,
            timestamp: new Date().toISOString()
        };
    }

    public static formatarSucesso(dados: any, mensagem: string = "Operação realizada com sucesso", statusCode: number = 200): object {
        return {
            success: true,
            statusCode,
            message: mensagem,
            data: dados,
            timestamp: new Date().toISOString()
        };
    }
}