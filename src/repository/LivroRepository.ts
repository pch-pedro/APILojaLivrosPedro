import { executarComandoSQL } from "../database/mysql";
import { LivroModel } from "../model/entity/LivroModel";
import { RowDataPacket, OkPacket } from 'mysql2/promise';

export class LivroRepository{
    private static instance: LivroRepository;

    private constructor() {}

    public static async getInstance(): Promise<LivroRepository>{
        if(!this.instance){
            this.instance = new LivroRepository();
            await this.instance.criarTable();
        }
        return this.instance;
    }

    private mapToModel(row: RowDataPacket): LivroModel {
        return new LivroModel(
            row.categoria_id, 
            row.titulo,
            row.autor, 
            row.isbn,
            row.preco,
            row.estoque,
            row.sinopse,
            row.imageURL, 
            row.editora,
            row.data_publicacao,
            row.promocao,
            row.id
        );
    }

    private async criarTable(){
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Livro(
                id INT AUTO_INCREMENT PRIMARY KEY,
                categoria_id INT NOT NULL,
                titulo VARCHAR(255) NOT NULL,
                autor VARCHAR(255) NOT NULL,              
                isbn VARCHAR(13) NOT NULL UNIQUE,
                preco DECIMAL(10,2) NOT NULL,
                estoque INT NOT NULL,
                sinopse TEXT,
                imageURL VARCHAR(255),  <--- Criando com o nome final
                editora VARCHAR(255) NOT NULL,
                data_publicacao DATE,
                promocao BOOLEAN DEFAULT FALSE
            )ENGINE=InnoDB
        `;

        try{
            await executarComandoSQL(createTableQuery, []);
            console.log('Tabela de Livro criada/verificada com Sucesso!');
        } catch(err){
            console.error('Erro ao executar CREATE TABLE: ', err);
        }

        const alterStatusQuery = `
            ALTER TABLE Livro
            CHANGE COLUMN status editora VARCHAR(255) NOT NULL;
        `;
        try {
            await executarComandoSQL(alterStatusQuery, []);
            console.log('SUCESSO: Coluna status renomeada para editora.');
        } catch (err: any) {
            // Ignora se o nome já estiver correto ou se a coluna não existir.
            console.warn('AVISO: Falha na alteração da coluna status. Verificar esquema.');
        }
        const addPromocaoQuery = `
            ALTER TABLE Livro
            ADD COLUMN promocao BOOLEAN DEFAULT FALSE;
        `;
        try {
            await executarComandoSQL(addPromocaoQuery, []);
            console.log('SUCESSO: Coluna promocao adicionada.');
        } catch (err: any) {
            if (!err.message.includes("Duplicate column name")) {
                 console.warn('AVISO: Falha ao adicionar a coluna promocao. Verificar esquema.');
            }
        }
    }

    async insereLivro(livro: LivroModel): Promise<LivroModel>{

        const resultadoExistente = await executarComandoSQL(
            "SELECT * FROM Livro WHERE titulo = ? AND isbn = ?",
            [livro.titulo, livro.isbn]
        );

        if (resultadoExistente && resultadoExistente.length > 0) {
            throw new Error("Livro com este título e ISBN já existe!");
        }

        const resultado = await executarComandoSQL(
            "INSERT INTO Livro (categoria_id, titulo, autor, isbn, preco, estoque, sinopse, imageURL, editora, data_publicacao, promocao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
            livro.promocao,
            resultado.insertId
        );
    }
    
    validacaoISBN(isbn: string): boolean {
        return isbn.toString().length === 13;
    }

    async filtraLivroPorISBN(isbn: string): Promise<LivroModel | null>{
        const resultado = await executarComandoSQL("SELECT * FROM Livro WHERE isbn = ? LIMIT 1", [isbn]);
        if(resultado && resultado.length > 0){
            return this.mapToModel(resultado[0]);
        }
        return null;
    }

    async filtraLivroPorId(id: number): Promise<LivroModel | null>{
        const resultado = await executarComandoSQL("SELECT * FROM Livro WHERE id = ?", [id]);
        if(resultado && resultado.length > 0) {
            return this.mapToModel(resultado[0]);
        }
        return null;
    }

    async filtrarLivrosPorIds(ids: number[]): Promise<LivroModel[]> {
        if (ids.length === 0) return [];

        const placeholders = ids.map(() => '?').join(',');
        const query = `
            SELECT id, titulo, preco, estoque, autor, categoria_id, isbn, sinopse, imageURL, editora, data_publicacao, promocao 
            FROM Livro 
            WHERE id IN (${placeholders})
        `;

        const resultado = await executarComandoSQL(query, ids);

        let rows: any[] = [];
        if (Array.isArray(resultado)) {
            if (Array.isArray(resultado[0])) {
                rows = resultado[0];
            } else {
                rows = resultado; 
            }
        }

        return rows.map(this.mapToModel);
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

        await executarComandoSQL("DELETE FROM Livro where id = ?", [id]);
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

        if(novosDados.isbn){
            if(this.validacaoISBN(novosDados.isbn) === false){
                throw new Error("ISBN invalida. Precisa ter 13 digitos");
            }

            const existente = await this.filtraLivroPorISBN(novosDados.isbn);
            if(existente && existente.id !== id){
                throw new Error("Ja existe outro livro com este ISBN");
            }
            
            campos.push("isbn = ?");
            valores.push(novosDados.isbn)
        }

        if(novosDados.preco){
            campos.push("preco = ?");
            valores.push(novosDados.preco);
        }

        if(novosDados.estoque !== undefined){
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

        if(novosDados.promocao !== undefined){
            campos.push("promocao = ?");
            valores.push(novosDados.promocao);
        }

        if (campos.length === 0) {
            return await this.filtraLivroPorId(id);
        }

        const sql = `UPDATE Livro SET ${campos.join(", ")} WHERE id = ?`;
        valores.push(id);

        await executarComandoSQL(sql, valores);

        return await this.filtraLivroPorId(id);
    }

    async atualizarEstoque(id: number, delta: number): Promise<boolean> {
        const query = `
            UPDATE Livro
            SET estoque = estoque + ?
            WHERE id = ?
        `;
        const resultado: OkPacket = await executarComandoSQL(query, [delta, id]) as OkPacket;
        
        return resultado.affectedRows > 0;
    }

    async listarLivros(): Promise<LivroModel[]>{
        const resultado = await executarComandoSQL("SELECT * FROM Livro WHERE estoque > 0 ORDER BY titulo ASC", []);
        const livros: LivroModel[] = [];
        if(resultado && resultado.length > 0){
            for(let i = 0; i < resultado.length; i++){
                livros.push(this.mapToModel(resultado[i]));
            }
        }
        return livros;
    }
}
