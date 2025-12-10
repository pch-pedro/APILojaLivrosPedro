export class CarrinhoModel{
    id?: number;
    usuario_id: number;
    livro_id: number;
    quantidade: number;
    data_adicao: Date;

    constructor(usuario_id: number, livro_id: number, quantidade: number, data_adicao: Date, id?: number){
        this.id = id;
        this.usuario_id = usuario_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.data_adicao = data_adicao;
    }

}