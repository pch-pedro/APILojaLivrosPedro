import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { executarComandoSQL } from '../database/mysql';
import { CarrinhoModel } from '../model/entity/CarrinhoModel';

type CarrinhoCreateOrUpdateData = Omit<CarrinhoModel, 'id' | 'data_adicao'>;

export class CarrinhoRepository {
    
    private static instance: CarrinhoRepository;

    private constructor() {}

    public static async getInstance(): Promise<CarrinhoRepository> {
        if (!CarrinhoRepository.instance) {
            CarrinhoRepository.instance = new CarrinhoRepository();
            await CarrinhoRepository.instance.createTable();
        }
        return CarrinhoRepository.instance;
    }

    private mapToModel(row: RowDataPacket): CarrinhoModel {
        return new CarrinhoModel(
            row.usuario_id,
            row.livro_id,
            row.quantidade,
            row.data_adicao,
            row.id
        );
    }

    public async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS Carrinho (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                livro_id INT NOT NULL,
                quantidade INT NOT NULL,
                data_adicao DATETIME NOT NULL,
                -- CRUCIAL: Garante que um usuário não pode ter o mesmo livro duas vezes
                UNIQUE KEY unique_item (usuario_id, livro_id), 
                FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
                FOREIGN KEY (livro_id) REFERENCES Livro(id)
            )`;
        await executarComandoSQL(query, []);
    }

    async inserirItem(data: CarrinhoCreateOrUpdateData): Promise<CarrinhoModel> {
        const now = new Date();
        const query = `
            INSERT INTO Carrinho (usuario_id, livro_id, quantidade, data_adicao)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                quantidade = quantidade + VALUES(quantidade),
                data_adicao = ?; 
        `;
        const values = [data.usuario_id, data.livro_id, data.quantidade, now, now];
        
        await executarComandoSQL(query, values);
        
        return await this.buscarItens(data.usuario_id, data.livro_id) as CarrinhoModel;
    }
    
    async aplicarQuantidade(usuarioId: number, livroId: number, quantidade: number): Promise<CarrinhoModel | undefined> {
        const now = new Date();
        const query = `
            UPDATE Carrinho
            SET quantidade = ?, data_adicao = ?
            WHERE usuario_id = ? AND livro_id = ?;
        `;
        const values = [quantidade, now, usuarioId, livroId];
        
        const resultado: OkPacket = await executarComandoSQL(query, values) as OkPacket;
        
        return resultado.affectedRows > 0 ? this.buscarItens(usuarioId, livroId) : undefined;
    }


    async buscarItens(usuarioId: number, livroId: number): Promise<CarrinhoModel | undefined> {
        console.log("Buscando item no carrinho para usuário:", usuarioId, "e livro:", livroId);

        const query = `
            SELECT id, usuario_id, livro_id, quantidade, data_adicao 
            FROM Carrinho 
            WHERE usuario_id = ? AND livro_id = ?
        `;

        let result;
        try {
            result = await executarComandoSQL(query, [usuarioId, livroId]);
            console.log("Resultado bruto do SQL:", result);
        } catch (err) {
            console.error("Erro ao executar comando SQL:", err);
            throw err;
        }

        let rows: any[];
        if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
            rows = result[0];
        } else if (Array.isArray(result)) {
            rows = result;
        } else {
            rows = [];
        }

        console.log("Rows processados:", rows);

        if (rows.length === 0) {
            console.log("Nenhum item encontrado no carrinho.");
            return undefined;
        }

        const item = this.mapToModel(rows[0]);
        console.log("Item encontrado no carrinho:", item);
        return item;
    }

    async buscarCarrinhoPorUsuId(usuarioId: number): Promise<CarrinhoModel[]> {
        console.log("Buscando carrinho no repositório para usuário ID:", usuarioId);

        const query = `
            SELECT id, usuario_id, livro_id, quantidade, data_adicao 
            FROM Carrinho 
            WHERE usuario_id = ?
            ORDER BY data_adicao DESC
        `;

        let result;
        try {
            result = await executarComandoSQL(query, [usuarioId]);
            console.log("Resultado bruto do SQL:", result);
        } catch (err) {
            console.error("Erro ao executar consulta SQL no CarrinhoRepository:", err);
            throw err;
        }

        let rows: RowDataPacket[] = [];
        if (Array.isArray(result)) {
            if (result.length > 0 && Array.isArray(result[0])) {
                rows = result[0];
            } else {
                rows = result as RowDataPacket[];
            }
        }

        console.log("Rows processados:", rows);

        const models = rows.map(row => this.mapToModel(row));
        console.log("Itens mapeados para CarrinhoModel:", models);

        return models;
    }


    
    async removerItem(usuarioId: number, livroId: number): Promise<boolean> {
        const query = 'DELETE FROM Carrinho WHERE usuario_id = ? AND livro_id = ?';
        const resultado: OkPacket = await executarComandoSQL(query, [usuarioId, livroId]) as OkPacket;

        return resultado.affectedRows > 0;
    }

    async limparCarrinho(usuarioId: number): Promise<boolean> {
        const query = 'DELETE FROM Carrinho WHERE usuario_id = ?';
        const resultado: OkPacket = await executarComandoSQL(query, [usuarioId]) as OkPacket;

        return resultado.affectedRows > 0;
    }
}