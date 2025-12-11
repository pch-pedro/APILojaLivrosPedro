import { CarrinhoModel } from "../entity/CarrinhoModel";

export class CarrinhoResponseDto {
    id: number;
    usuario_id: number;
    livro_id: number;
    quantidade: number;
    data_adicao: string;

    constructor(model: CarrinhoModel) {
        this.id = model.id as number;
        this.usuario_id = model.usuario_id;
        this.livro_id = model.livro_id;
        this.quantidade = model.quantidade;
        this.data_adicao = model.data_adicao.toISOString();
    }
}