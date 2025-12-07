export class CarrinhoModel{
    static proximoId: number = 1;

    id: number;
    usuario_id: number;
    livro_id: number;
    quantidade: number;
    data_adicao: Date;

    constructor(usuario_id: number, livro_id: number, quantidade: number, data_adicao: Date){
        this.id = CarrinhoModel.proximoId++;
        this.usuario_id = usuario_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.data_adicao = data_adicao;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getUsuario_Id(): number{
        return this.usuario_id;
    }

    getLivro_Id(): number{
        return this.livro_id;
    }

    getQuantidade(): number{
        return this.quantidade;
    }

    getData_Adicao(): Date{
        return this.data_adicao;
    }

    //SETTERS

    setUsuario(usuario_id: number){
        this.usuario_id = usuario_id;
    }

    setIdLivro(livro_id: number){
        this.livro_id = livro_id;
    }

    setQuantidade(quantidade: number){
        this.quantidade = quantidade;
    }

    setData_Adicao(data_adicao: Date){
        this.data_adicao = data_adicao;
    }
}