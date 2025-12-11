"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoView = void 0;
class PedidoView {
    static formatCurrency(value) {
        if (typeof value !== 'number' || isNaN(value))
            return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    static formatarItemPedido(itemDto) {
        const subtotal = itemDto.quantidade * itemDto.preco_unitario_pago;
        return {
            livroId: itemDto.livro_id,
            quantidade: itemDto.quantidade,
            precoUnitario: PedidoView.formatCurrency(itemDto.preco_unitario_pago),
            subtotalItem: PedidoView.formatCurrency(subtotal),
        };
    }
    static formatarPedido(pedidoDto) {
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
    static formatarListaPedidos(pedidosDto) {
        const pedidosFormatados = pedidosDto.map(pedido => PedidoView.formatarPedido(pedido));
        return {
            total: pedidosDto.length,
            pedidos: pedidosFormatados
        };
    }
    static formatarErro(mensagem, statusCode = 400) {
        return {
            error: true,
            statusCode,
            message: mensagem,
            timestamp: new Date().toISOString()
        };
    }
    static formatarSucesso(dados, mensagem = "Operação realizada com sucesso", statusCode = 200) {
        return {
            success: true,
            statusCode,
            message: mensagem,
            data: dados,
            timestamp: new Date().toISOString()
        };
    }
}
exports.PedidoView = PedidoView;
