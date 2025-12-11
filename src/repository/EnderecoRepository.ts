import { EnderecoModel } from '../model/entity/EnderecoModel';
import { RowDataPacket, OkPacket } from 'mysql2/promise';
import { executarComandoSQL } from '../database/mysql'; 


type EnderecoCreateData = Omit<EnderecoModel, 'id'>;
type EnderecoUpdateData = Partial<EnderecoModel>;

export class EnderecoRepository {
    private static instance: EnderecoRepository;

    constructor() {}

    public static async getInstance(): Promise<EnderecoRepository> {
        if (!EnderecoRepository.instance) {
            EnderecoRepository.instance = new EnderecoRepository();
            await EnderecoRepository.instance.createTable();
        }
        return EnderecoRepository.instance;
    }

    private mapToModel(row: RowDataPacket): EnderecoModel {
        return new EnderecoModel(
            row.usuario_id,
            row.cep,
            row.rua,
            row.numero,
            row.complemento,
            row.cidade,
            row.estado,
            row.id 
        );
    }

    public async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS Endereco (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                cep VARCHAR(10) NOT NULL,
                rua VARCHAR(100) NOT NULL,
                numero VARCHAR(10) NOT NULL,
                complemento VARCHAR(50),
                cidade VARCHAR(100) NOT NULL,
                estado VARCHAR(50) NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
            )ENGINE=InnoDB`;
        try {
            await executarComandoSQL(query, []);
            console.log("Tabela Usuario criada com sucesso.");
        } catch (err) {
            console.error("Erro ao criar tabela Usuário:", err);
            throw err;
        }
    }


    async inserirEndereco(data: EnderecoCreateData): Promise<EnderecoModel> {
        const query = `
            INSERT INTO Endereco 
            (usuario_id, cep, rua, numero, complemento, cidade, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.usuario_id,
            data.cep,
            data.rua,
            data.numero,
            data.complemento || null,
            data.cidade,
            data.estado,
        ];

        const resultado: OkPacket = await executarComandoSQL(query, values) as OkPacket;
        
        return new EnderecoModel(
            data.usuario_id,
            data.cep,
            data.rua,
            data.numero,
            data.complemento,
            data.cidade,
            data.estado,
            resultado.insertId 
        );
    }

    async buscarPorId(id: number): Promise<EnderecoModel | undefined> {
        const query = `
            SELECT id, usuario_id, cep, rua, numero, complemento, cidade, estado 
            FROM Endereco 
            WHERE id = ?
        `;

        let result;
        try {
            result = await executarComandoSQL(query, [id]);
            console.log("Resultado bruto do SQL (buscarPorId):", result);
        } catch (err) {
            console.error("Erro ao executar query de endereço por ID:", err);
            throw err;
        }

        let rows: any[] = [];
        if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
            rows = result[0];
        } else if (Array.isArray(result)) {
            rows = result;
        }

        if (rows.length === 0) {
            return undefined;
        }

        return this.mapToModel(rows[0]);
    }

    async buscarUsuarioPorId(usuarioId: number): Promise<EnderecoModel[]> {
        const query = `
            SELECT id, usuario_id, cep, rua, numero, complemento, cidade, estado 
            FROM Endereco 
            WHERE usuario_id = ?
        `;

        let result;
        try {
            result = await executarComandoSQL(query, [usuarioId]);
            console.log("Resultado bruto do SQL (endereços):", result);
        } catch (err) {
            console.error("Erro ao executar query de endereços:", err);
            throw err;
        }

        let rows: any[] = [];
        if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
            rows = result[0];
        } else if (Array.isArray(result)) {
            rows = result;
        }

        return rows.map(row => this.mapToModel(row));
    }


    async atualizarDadosEndereco(id: number, data: EnderecoUpdateData): Promise<EnderecoModel | undefined> {
        const fields = [];
        const values = [];

        if (data.cep !== undefined) { fields.push('cep = ?'); values.push(data.cep); }
        if (data.rua !== undefined) { fields.push('rua = ?'); values.push(data.rua); }
        if (data.numero !== undefined) { fields.push('numero = ?'); values.push(data.numero); }
        if (data.complemento !== undefined) { fields.push('complemento = ?'); values.push(data.complemento || null); }
        if (data.cidade !== undefined) { fields.push('cidade = ?'); values.push(data.cidade); }
        if (data.estado !== undefined) { fields.push('estado = ?'); values.push(data.estado); }

        if (fields.length === 0) {
            return this.buscarPorId(id); 
        }

        values.push(id);
        const query = `UPDATE Endereco SET ${fields.join(', ')} WHERE id = ?`;

        const resultado: OkPacket = await executarComandoSQL(query, values) as OkPacket;

        return resultado.affectedRows > 0 ? this.buscarPorId(id) : undefined;
    }

    async removerEndereco(id: number): Promise<boolean> {
        const query = 'DELETE FROM Endereco WHERE id = ?';
        const resultado: OkPacket = await executarComandoSQL(query, [id]) as OkPacket;

        return resultado.affectedRows > 0;
    }
}