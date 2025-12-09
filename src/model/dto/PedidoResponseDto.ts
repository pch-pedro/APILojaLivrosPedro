// src/model/dto/PedidoResponseDto.ts

import { PedidoModel } from "../entity/PedidoModel";
import { ItemPedidoModel } from "../entity/ItemPedidoModel";
import { PedidoStatus } from "../../enums/PedidoStatus";
import { FormaPagamento } from "../../enums/FormaPagamento";

export class ItemPedidoResponseDto {
    id: number;
    livro_id: number;
    quantidade: number;
    preco_unitario_pago: number;

    constructor(model: ItemPedidoModel) {
        this.id = model.id as number;
        this.livro_id = model.livro_id;
        this.quantidade = model.quantidade;
        this.preco_unitario_pago = model.preco_unitario_pago;
    }
}

export class PedidoResponseDto {
    id: number;
    usuario_id: number;
    endereco_entrega_id: number;
    data_pedido: Date;
    valor_total: number;
    status_pedido: PedidoStatus;
    forma_pagamento: FormaPagamento; 
    itens: ItemPedidoResponseDto[];

    constructor(model: PedidoModel, itensDto: ItemPedidoResponseDto[]) {
        this.id = model.id as number;
        this.usuario_id = model.usuario_id;
        this.endereco_entrega_id = model.endereco_entrega_id;
        this.data_pedido = model.data_pedido;
        this.valor_total = model.valor_total;
        this.status_pedido = model.status_pedido;
        this.forma_pagamento = model.forma_pagamento;
        this.itens = itensDto;
    }
}