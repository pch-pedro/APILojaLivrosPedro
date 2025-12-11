import { executarComandoSQL } from "../database/mysql";
import { CategoriaModel } from "../model/entity/CategoriaModel";

export class CategoriaRepository{

    private static instance: CategoriaRepository;

    private constructor(){
        this.criarTable();
    }

    public static getInstance(): CategoriaRepository{
        if(!this.instance){
            this.instance = new CategoriaRepository();
        }
        return this.instance;
    }

    private async criarTable(){
        const query = `CREATE TABLE IF NOT EXISTS Categoria(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
                )`;

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de Categoria criada com Sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de Categoria: ', err);
        }
    }

    async insereCategoria(categoria: CategoriaModel): Promise<CategoriaModel>{
        //Validação Adicionada: Verificando se já há uma categoria com o mesmo nome no sistema
        const resultadoExistente = await executarComandoSQL(
            "SELECT * FROM Categoria WHERE LOWER(nome) = LOWER(?)",
            [categoria.nome.trim()]
        );
    
        if (resultadoExistente && resultadoExistente.length > 0) {
            throw new Error("Categoria com este nome já existe!");
        }
    
        const resultado = await executarComandoSQL(
            "INSERT INTO Categoria (nome) values (?)",
            [
                categoria.nome.trim()
            ]);
            
            console.log("Categoria criada com Sucesso: ", resultado);
    
            return new CategoriaModel(
                categoria.nome,
                resultado.insertId
        );
    }

    async listarCategoria(): Promise<CategoriaModel[]>{
        const resultado = await executarComandoSQL("SELECT * FROM Categoria ORDER BY nome ASC", []);
        const categoria: CategoriaModel[] = [];
        if(resultado && resultado.length > 0){
            for(let i = 0; i < resultado.length; i++){
                const user = resultado[i];
                categoria.push(new CategoriaModel(
                    user.id,
                    user.nome
                ));
            }
        }
        return categoria;
    }

    async listarCategoriaPorId(id: number): Promise<CategoriaModel | null>{
        const resultado = await executarComandoSQL("SELECT * FROM Categoria WHERE id = ?", [id]);
        if(resultado && resultado.length > 0) {
            const user = resultado[0];
            return new CategoriaModel(
                user.id,
                user.nome
            );
        }
        return null;
    }

    async atualizarCategoriaPorId(id: number, novosDados: any): Promise<CategoriaModel | null>{
        const campos: string[] = [];
        const valores: any[] = [];

        if(novosDados.nome){
            const existente = await executarComandoSQL(
                "SELECT * FROM Categoria WHERE LOWER(nome) = LOWER(?) AND id <> ?",
                [novosDados.nome.trim(), id]
            );

            if(existente && existente.length > 0){
                throw new Error("Ja existe uma categoria com este nome");
            }

            campos.push("nome = ?");
            valores.push(novosDados.nome.trim());
        }

        if(campos.length === 0){
            throw new Error("Nenhum campo para atualizar");
        }

        const sql = `UPDATE Categoria SET ${campos.join(", ")} WHERE id = ?`;
        valores.push(id);

        const resultado = await executarComandoSQL(sql, valores);
        console.log(resultado);

        return await this.listarCategoriaPorId(id);
    }

    async removeCategoriaPorId(id: number): Promise<CategoriaModel | null>{
        const categoria = await this.listarCategoriaPorId(id);
        if(!categoria){
            return null;
        }

        await executarComandoSQL("DELETE FROM Categoria where id = ?", [id]);
        return categoria;
    }
}