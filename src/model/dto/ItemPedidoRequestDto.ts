export class ItemPedidoRequestDto {
    livro_id: number;
    quantidade: number;

    constructor(livro_id: number, quatidade: number){
        this.livro_id = livro_id;
        this.quantidade = quatidade;
    }
}