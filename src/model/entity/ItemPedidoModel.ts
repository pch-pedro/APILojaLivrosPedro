export class ItemPedidoModel {
    id?: number;
    pedido_id: number; 
    livro_id: number; 
    quantidade: number;
    preco_unitario_pago: number; 

    constructor(pedido_id: number, livro_id: number, quantidade: number, preco_unitario_pago: number, id?: number) {
        this.id = id;
        this.pedido_id = pedido_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.preco_unitario_pago = preco_unitario_pago;
    }
}