export class ItemPedidoModel{
    static proximoId: number = 1;

    id: number;
    pedido_id: number;
    livro_id: number;
    quantidade: number;
    preco_unitario_pago: number;

    constructor(pedido_id: number, livro_id: number, quantidade: number, preco_unitario_pago: number){
        this.id = ItemPedidoModel.proximoId++;
        this.pedido_id = pedido_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.preco_unitario_pago = preco_unitario_pago;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getPedido_Id(): number{
        return this.pedido_id;
    }

    getLivro_Id(): number{
        return this.livro_id;
    }

    getQuantidade(): number{
        return this.quantidade
    }

    getPreco_Unitario_Pago(): number{
        return this.preco_unitario_pago;
    }

    //SETTERS

    setPedido_Id(pedido_id: number): void{
        this.pedido_id = pedido_id;
    }

    setLivro_Id(livro_id: number){
        this.livro_id = this.livro_id;
    }

    setQuantidade(quantidade: number){
        this.quantidade = quantidade;
    }

    setPreco_Unitario_Pago(preco_unitario_pago: number){
        this.preco_unitario_pago = preco_unitario_pago;
    }
}