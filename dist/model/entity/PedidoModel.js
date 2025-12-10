"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoModel = void 0;
class PedidoModel {
    id;
    usuario_id;
    endereco_entrega_id;
    data_pedido;
    valor_total;
    status_pedido;
    forma_pagamento;
    itens;
    constructor(usuario_id, endereco_entrega_id, data_pedido, valor_total, status_pedido, forma_pagamento, id, itens) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.endereco_entrega_id = endereco_entrega_id;
        this.data_pedido = data_pedido;
        this.valor_total = valor_total;
        this.status_pedido = status_pedido;
        this.forma_pagamento = forma_pagamento;
        this.itens = itens;
    }
}
exports.PedidoModel = PedidoModel;
