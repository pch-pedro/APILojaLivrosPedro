class ItemPedidoModel{

    static proximoId: number = 1;

    id: number;
    idPedido: number;
    idLivro: number;
    quantidade: number;
    precoUnitario: number;

    constructor(idPedido: number, idLivro: number, quantidade: number, precoUnitario: number){
        this.id = ItemPedidoModel.proximoId++;
        this.idPedido = idPedido;
        this.idLivro = idLivro;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getIdPedido(): number{
        return this.idPedido;
    }

    getIdLivro(): number{
        return this.idLivro;
    }

    getQuantidade(): number{
        return this.quantidade
    }

    getPrecoUnitario(): number{
        return this.precoUnitario;
    }

    //SETTERS

    setIdPedido(idPedido: number): void{
        this.idPedido = idPedido;
    }

    setIdLivro(idLivro: number){
        this.idLivro = idLivro;
    }

    setQuantidade(quantidade: number){
        this.quantidade = quantidade;
    }

    setPrecoUnitario(precoUnitario: number){
        this.precoUnitario = precoUnitario;
    }
}