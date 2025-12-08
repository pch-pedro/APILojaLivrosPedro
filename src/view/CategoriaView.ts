import { CategoriaModel } from "../model/entity/CategoriaModel";

export class CategoriaView{
    static formatarCategoria(categoria: CategoriaModel): object{
        return{
            id: categoria.getId(),
            nome: categoria.getNome()
        };
    }

    static formatarListaCategoria(categorias: CategoriaModel[]): object {
        const categoriasFormatadas: object[] = [];
        for(let i: number = 0; i < categorias.length; i++){
            categoriasFormatadas.push(this.formatarCategoria(categorias[i]));
        }
        return {
            total: categorias.length,
            categorias: categoriasFormatadas
        };
    }

    static formatarErro(mensagem: string, statusCode: number = 400): object {
        return {
            error: true,
            statusCode,
            message: mensagem,
            timestamp: new Date().toISOString()
        };
    }

    static formatarSucesso(dados: any, mensagem: string = "Operação realizada com sucesso", statusCode: number = 200): object {
        return {
            success: true,
            statusCode,
            message: mensagem,
            data: dados,
            timestamp: new Date().toISOString()
        };
    }
}