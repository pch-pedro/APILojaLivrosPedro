"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoRequestDto = void 0;
class PedidoRequestDto {
    usuario_id;
    endereco_entrega_id;
    forma_pagamento;
    itens;
    constructor(usuario_id, endereco_entrega_id, foma_pagamento, itens) {
        this.usuario_id = usuario_id;
        this.endereco_entrega_id = endereco_entrega_id;
        this.forma_pagamento = foma_pagamento;
        this.itens = itens;
    }
}
exports.PedidoRequestDto = PedidoRequestDto;
