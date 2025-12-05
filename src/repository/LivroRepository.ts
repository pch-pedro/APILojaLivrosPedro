import { executarComandoSQL } from "../database/mysql";
import { LivroModel } from "../model/LivroModel";

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
                categoria_id INT NOT NULL
                titulo VARCHAR(255) NOT NULL,
                isbn VARCHAR(13) NOT NULL UNIQUE,
                preco INT(10,2) NOT NULL,
                estoque INT NOT NULL,
                sinopse TEXT,
                imageURL VARCHAR(255),
                autor VARCHAR(255) NOT NULL,
                editora VARCHAR(255) NOT NULL,
                data_publicação DATE,
                promocao BOOLEAN
                )`

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de Livro criada com Sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de livro: ', err);
        }
    }

    async insereLivro(livro: LivroModel): Promise<LivroModel>{
        const resultado = await executarComandoSQL(
            "INSERT INTO lectus_bd.Livro (categoria_id, titulo, isbn, preco, estoque, sinopse, imageURL, autor, editora, data_publicacao) values (?,?,?,?,?)",
            [
                livro.isbn, 
                livro.titulo,
                livro.autor,
                livro.editora,
                livro.anoPublicacao
            ]);
        
            console.log("Livro criado com Sucesso: ", resultado);

        return new LivroModel(
            livro.isbn,
            livro.titulo,
            livro.autor,
            livro.editora,
            livro.anoPublicacao
        );
    }
    
    validacaoISBN(isbn: string): boolean {
        return isbn.toString().length === 13;
    }

    async filtraLivroPorISBN(isbn: string): Promise<LivroModel | null>{
        const resultado = await executarComandoSQL("SELECT * FROM lectus_bd.Livro WHERE isbn = ?", [isbn]);
        if(resultado && resultado.length > 0) {
            const user = resultado[0];
            return new LivroModel(
                user.isbn,
                user.titulo,
                user.autor,
                user.editora,
                user.anoPublicacao
            );
        }
        return null;
    }

    async validacaoLivro(isbn: string): Promise<boolean> {
        const livro = await this.filtraLivroPorISBN(isbn);
        return livro !== null;
    }

    async removeLivroPorISBN(isbn: string): Promise<LivroModel | null>{
       const livro = await this.filtraLivroPorISBN(isbn);
       if(!livro){
            return null;
       }

       await executarComandoSQL("DELETE FROM lectus_bd.Livro where isbn = ?", [isbn]);
       return livro;
    }

    async atualizarLivroPorISBN(isbn: string, novosDados: any): Promise<LivroModel | null>{
        const campos: string[] = [];
        const valores: any[] = [];

        if(novosDados.titulo){
            campos.push("titulo = ?");
            valores.push(novosDados.titulo);
        }

        if(novosDados.autor){
            campos.push("autor = ?");
            valores.push(novosDados.autor);
        }

        if(novosDados.editora){
            campos.push("editora = ?");
            valores.push(novosDados.editora);
        }

        if(novosDados.anoPublicacao){
            campos.push("anoPublicacao = ?");
            valores.push(novosDados.edicao);
        }

        if (campos.length === 0) {
            return await this.filtraLivroPorISBN(isbn);
        }

        const sql = `UPDATE lectus_bd.Livro SET ${campos.join(", ")} WHERE isbn = ?`;
        valores.push(isbn);

        const resultado = await executarComandoSQL(sql, valores);
        console.log(resultado);

        return await this.filtraLivroPorISBN(isbn);
    }

    async listarLivros(): Promise<LivroModel[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Livro", []);
        const livros: LivroModel[] = [];
        if(resultado && resultado.length > 0){
            for(let i = 0; i < resultado.length; i++){
                const user = resultado[i];
                livros.push(new LivroModel(
                    user.titulo,
                    user.isbn,
                    user.autor,
                    user.editora,
                    user.anoPublicacao
                ));
            }
        }
        return livros;
    }
}