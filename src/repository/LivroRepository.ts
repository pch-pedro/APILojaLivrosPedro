import { executarComandoSQL } from "../database/mysql";
import { LivroModel } from "../model/entity/LivroModel";

export class LivroRepository{
    private static instance: LivroRepository;

    private constructor() {
        this.criarTable();
    }

    public static getInstance(): LivroRepository{
        if(!this.instance){
            this.instance = new LivroRepository();
        }
        return this.instance;
    }

    private async criarTable(){
        const query = `CREATE TABLE IF NOT EXISTS lectus_bd.Livro(
                id INT AUTO_INCREMENT PRIMARY KEY,
                categoria_id INT NOT NULL,
                titulo VARCHAR(255) NOT NULL,
                autor VARCHAR(255) NOT NULL,                
                isbn VARCHAR(13) NOT NULL UNIQUE,
                preco DECIMAL(10,2) NOT NULL,
                estoque INT NOT NULL,
                sinopse TEXT,
                imageURL VARCHAR(255),
                editora VARCHAR(255) NOT NULL,
                data_publicacao DATE,
                promocao BOOLEAN DEFAULT FALSE
                )`;

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de Livro criada com Sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de livro: ', err);
        }
    }

    async insereLivro(livro: LivroModel): Promise<LivroModel>{

        //Validação Adicionada: Verificando se já há um livro com o mesmo título e ISBN no sistema
        const resultadoExistente = await executarComandoSQL(
            "SELECT * FROM Livro WHERE titulo = ? AND isbn = ?",
            [livro.titulo, livro.isbn]
        );

        if (resultadoExistente && resultadoExistente.length > 0) {
            throw new Error("Livro com este título e ISBN já existe!");
        }

        const resultado = await executarComandoSQL(
            "INSERT INTO lectus_bd.Livro (categoria_id, titulo, autor, isbn, preco, estoque, sinopse, imageURL, editora, data_publicacao, promocao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                livro.categoria_id, 
                livro.titulo,
                livro.autor,
                livro.isbn,
                livro.preco,
                livro.estoque,
                livro.sinopse,
                livro.imageURL,
                livro.editora,
                livro.data_publicacao,
                livro.promocao
            ]);
        
            console.log("Livro criado com Sucesso: ", resultado);

        return new LivroModel(
            livro.categoria_id, 
                livro.titulo,
                livro.autor,
                livro.isbn,
                livro.preco,
                livro.estoque,
                livro.sinopse,
                livro.imageURL,
                livro.editora,
                livro.data_publicacao,
                livro.promocao
        );
    }
    
    validacaoISBN(isbn: string): boolean {
        return isbn.toString().length === 13;
    }

    async filtraLivroPorISBN(isbn: string): Promise<LivroModel | null>{
        const resultado = await executarComandoSQL("SELECT * FROM lectus_bd.Livro WHERE isbn = ? LIMIT 1", [isbn]);
        if(resultado && resultado.length > 0){
            const row = resultado[0];
            return new LivroModel(
                row.categoria_id,
                row.titulo,
                row.isbn,
                row.preco,
                row.estoque,
                row.sinopse,
                row.imageURL,
                row.autor,
                row.editora,
                row.data_publicacao
            );
        }
        return null;
    }

    async filtraLivroPorId(id: number): Promise<LivroModel | null>{
        const resultado = await executarComandoSQL("SELECT * FROM lectus_bd.Livro WHERE id = ?", [id]);
        if(resultado && resultado.length > 0) {
            const user = resultado[0];
            return new LivroModel(
                user.categoria_id,
                user.titulo,
                user.isbn,
                user.preco,
                user.estoque,
                user.sinopse,
                user.imageURL,
                user.autor,
                user.editora,
                user.data_publicacao
            );
        }
        return null;
    }

    async validacaoLivroPorId(id: number): Promise<boolean> {
        const livro = await this.filtraLivroPorId(id);
        return livro !== null;
    }

    async validacaoLivroPorISBN(isbn: string): Promise<boolean> {
        const livro = await this.filtraLivroPorISBN(isbn);
        return livro !== null;
    }

    async removeLivroPorId(id: number): Promise<LivroModel | null>{
       const livro = await this.filtraLivroPorId(id);
       if(!livro){
            return null;
       }

       await executarComandoSQL("DELETE FROM lectus_bd.Livro where id = ?", [id]);
       return livro;
    }

    async atualizarLivroPorId(id: number, novosDados: any): Promise<LivroModel | null>{
        const campos: string[] = [];
        const valores: any[] = [];

        if(novosDados.categoria_id){
            campos.push("categoria_id = ?");
            valores.push(novosDados.categoria_id);
        }

        if(novosDados.titulo){
            campos.push("titulo = ?");
            valores.push(novosDados.titulo);
        }

        if(novosDados.autor){
            campos.push("autor = ?");
            valores.push(novosDados.autor);
        }

        if(novosDados.preco){
            campos.push("preco = ?");
            valores.push(novosDados.preco);
        }

        if(novosDados.estoque){
            campos.push("estoque = ?");
            valores.push(novosDados.estoque);
        }

        if(novosDados.sinopse){
            campos.push("sinopse = ?");
            valores.push(novosDados.sinopse);
        }

        if(novosDados.imageURL){
            campos.push("imageURL = ?");
            valores.push(novosDados.imageURL);
        }

        if(novosDados.editora){
            campos.push("editora = ?");
            valores.push(novosDados.editora);
        }

        if(novosDados.data_publicacao){
            campos.push("data_publicacao = ?");
            valores.push(novosDados.data_publicacao);
        }

        if(novosDados.promocao){
            campos.push("promocao = ?");
            valores.push(novosDados.promocao);
        }

        if (campos.length === 0) {
            return await this.filtraLivroPorId(id);
        }

        const sql = `UPDATE lectus_bd.Livro SET ${campos.join(", ")} WHERE id = ?`;
        valores.push(id);

        const resultado = await executarComandoSQL(sql, valores);
        console.log(resultado);

        return await this.filtraLivroPorId(id);
    }

    async listarLivros(): Promise<LivroModel[]>{
        //Validação Adicionada: Retornando os livros por ordem alfabética e apenas se seu estoque for maior que zero.
        const resultado = await executarComandoSQL("SELECT * FROM lectus_bd.Livro WHERE estoque > 0 ORDER BY titulo ASC", []);
        const livros: LivroModel[] = [];
        if(resultado && resultado.length > 0){
            for(let i = 0; i < resultado.length; i++){
                const user = resultado[i];
                livros.push(new LivroModel(
                    user.categoria_id,
                    user.titulo,
                    user.isbn,
                    user.preco,
                    user.estoque,
                    user.sinopse,
                    user.imageURL,
                    user.autor,
                    user.editora,
                    user.data_publicacao
                ));
            }
        }
        return livros;
    }


    //Implementar função validar categoria do livro pelo id da Categoria
    /*async validacaoLCategoriaId(categoria_id: number): Promise<boolean> {
        const livro = await this.filtraLivroPorId(id);
        return livro !== null;
    }*/
}