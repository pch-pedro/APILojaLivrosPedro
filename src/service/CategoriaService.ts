import { CategoriaModel } from "../model/entity/CategoriaModel";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService{
    private categoriaRepository = CategoriaRepository.getInstance();

    async novaCategoria(data: any): Promise<CategoriaModel>{

        // construir modelo
        const categoria = new CategoriaModel(
            data.nome,
            data.id
        );

        return await this.categoriaRepository.insereCategoria(categoria);
    }

    async listarCategoria(): Promise<CategoriaModel[]>{
        const categoria = await this.categoriaRepository.listarCategoria();

        if(categoria.length === 0){
            throw new Error("Nenhuma categoria encontrada no sistema");
        }

        return categoria;
    }

    async listarCategoriaPorId(id: number): Promise<CategoriaModel>{
        const categoria = await this.categoriaRepository.listarCategoriaPorId(id);

        if(categoria === null){
            throw new Error("Categoria nao encontrado no sistema!");
        }

        return categoria;
    }

    async atualizaCategoria(id: number, novosDados: {nome?: string}): Promise<CategoriaModel>{
        const categoriaAtualizada = await this.categoriaRepository.atualizarCategoriaPorId(id, novosDados);

        if(categoriaAtualizada === null){
            throw new Error("Erro ao atualizar categoria");
        }

        return categoriaAtualizada;
    }

    async removeCategoria(id: number): Promise<CategoriaModel>{
        const categoriaRemovida = await this.categoriaRepository.removeCategoriaPorId(id);
        if(!categoriaRemovida){
            throw new Error("Categoria nao encontrado para remocao!");
        }
        return categoriaRemovida;
    }
}

export default new CategoriaService();