import { ItemPedidoRequestDto } from './ItemPedidoRequestDto';
import { FormaPagamento } from '../../enums/FormaPagamento';

export class PedidoRequestDto {
    usuario_id: number; 
    endereco_entrega_id: number;
    forma_pagamento: FormaPagamento; 
    itens: ItemPedidoRequestDto[]; 

    constructor(usuario_id: number, endereco_entrega_id: number, foma_pagamento: FormaPagamento,  itens: ItemPedidoRequestDto[]){
        this.usuario_id = usuario_id;
        this.endereco_entrega_id = endereco_entrega_id;
        this.forma_pagamento = foma_pagamento;
        this.itens = itens;
    }
}