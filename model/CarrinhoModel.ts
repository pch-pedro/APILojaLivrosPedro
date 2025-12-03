class CarrinhoModel{

    static proximoId: number = 1;

    id: number;
    idUsuario: number;
    idLivro: number;
    quantidade: number;
    dataAdicao: Date;

    constructor(idUsuario: number, idLivro: number, quantidade: number, dataAdicao: Date){
        this.id = CarrinhoModel.proximoId++;
        this.idUsuario = idUsuario;
        this.idLivro = idLivro;
        this.quantidade = quantidade;
        this.dataAdicao = dataAdicao;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getIdUsuario(): number{
        return this.idUsuario;
    }

    getIdLivro(): number{
        return this.idLivro;
    }

    getQuantidade(): number{
        return this.quantidade;
    }

    getDataAdicao(): Date{
        return this.dataAdicao;
    }

    //SETTERS

    setIdUsuario(idUsuario: number){
        this.idUsuario = idUsuario;
    }

    setIdLivro(idLivro: number){
        this.idLivro = idLivro;
    }

    setQuantidade(quantidade: number){
        this.quantidade = quantidade;
    }

    setDataAdicao(dataAdicao: Date){
        this.dataAdicao = dataAdicao;
    }
}