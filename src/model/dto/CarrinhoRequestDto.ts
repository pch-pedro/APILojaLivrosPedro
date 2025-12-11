export class CarrinhoRequestDto {
    usuario_id: number; 
    livro_id: number;
    quantidade: number;

    constructor(usuario_id: number, livro_id: number, quantidade: number){
        this.usuario_id = usuario_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
    }
}