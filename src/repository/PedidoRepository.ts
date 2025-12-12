import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { executarComandoSQL } from '../database/mysql';
import { PedidoModel } from '../model/entity/PedidoModel';
import { ItemPedidoModel } from '../model/entity/ItemPedidoModel';
import { PedidoStatus } from '../enums/PedidoStatus';
import { FormaPagamento } from '../enums/FormaPagamento';

type PedidoCreateData = Omit<PedidoModel, 'id' | 'itens' | 'data_pedido'> & { data_pedido: Date };
type ItemPedidoCreateData = Omit<ItemPedidoModel, 'id'>; 

export class PedidoRepository {
    
    private static instance: PedidoRepository;

    private constructor() {}

    public static async getInstance(): Promise<PedidoRepository> {
        if (!PedidoRepository.instance) {
            PedidoRepository.instance = new PedidoRepository();
            await PedidoRepository.instance.createTable();
            await PedidoRepository.instance.criarItemPedidoTable(); 
        }
        return PedidoRepository.instance;
    }

    private mapPedidoToModel(row: RowDataPacket): PedidoModel {
        return new PedidoModel(
            row.usuario_id,
            row.endereco_entrega_id,
            row.data_pedido,
            row.valor_total,
            row.status_pedido as PedidoStatus,
            row.forma_pagamento as FormaPagamento,
            row.id 
        );
    }
    
    private mapItemPedidoToModel(row: RowDataPacket): ItemPedidoModel {
        return new ItemPedidoModel(
            row.pedido_id,
            row.livro_id,
            row.quantidade,
            row.preco_unitario_pago,
            row.id
        );
    }

    

    public async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS Pedido (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            endereco_entrega_id INT NOT NULL,
            data_pedido DATETIME NOT NULL, 
            valor_total DECIMAL(10,2) NOT NULL,
            status_pedido ENUM('PENDENTE', 'PROCESSANDO', 'ENVIADO', 'ENTREGUE', 'CANCELADO') NOT NULL,
            forma_pagamento ENUM('PIX', 'CARTAO_CREDITO', 'BOLETO', 'TRANSFERENCIA') NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
            FOREIGN KEY (endereco_entrega_id) REFERENCES Endereco(id)
            ) ENGINE=InnoDB;`;
        try {
            await executarComandoSQL(query, []);
        } catch (err) {
            console.error("Erro ao criar tabela Pedido:", err);
            throw err;
        }
    }
    
    public async criarItemPedidoTable(): Promise<void> {

        const query = `
            CREATE TABLE IF NOT EXISTS ItemPedido (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pedido_id INT NOT NULL,
            livro_id INT NOT NULL,
            quantidade INT NOT NULL,
            preco_unitario_pago DECIMAL(10,2) NOT NULL,
            FOREIGN KEY (pedido_id) REFERENCES Pedido(id) ON DELETE CASCADE,
            FOREIGN KEY (livro_id) REFERENCES Livro(id)
        ) ENGINE=InnoDB;
        `;
        await executarComandoSQL(query, []);
    }

    async inserirPedido(pedidoData: PedidoCreateData, itensData: ItemPedidoCreateData[]): Promise<PedidoModel> {
        const pedidoQuery = `
            INSERT INTO Pedido 
            (usuario_id, endereco_entrega_id, data_pedido, valor_total, status_pedido, forma_pagamento)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const pedidoValues = [
            pedidoData.usuario_id,
            pedidoData.endereco_entrega_id,
            pedidoData.data_pedido,
            pedidoData.valor_total,
            pedidoData.status_pedido,
            pedidoData.forma_pagamento 
        ];
        
        const resultadoPedido: ResultSetHeader = await executarComandoSQL(pedidoQuery, pedidoValues) as ResultSetHeader;
        const pedidoId = resultadoPedido.insertId;

        const itemQueries = itensData.map(item => {
            const itemQuery = `
                INSERT INTO ItemPedido 
                (pedido_id, livro_id, quantidade, preco_unitario_pago)
                VALUES (?, ?, ?, ?)
            `;
            const itemValues = [
                pedidoId,
                item.livro_id,
                item.quantidade,
                item.preco_unitario_pago
            ];
            return executarComandoSQL(itemQuery, itemValues);
        });

        await Promise.all(itemQueries);
        return new PedidoModel(
            pedidoData.usuario_id,
            pedidoData.endereco_entrega_id,
            pedidoData.data_pedido,
            pedidoData.valor_total,
            pedidoData.status_pedido,
            pedidoData.forma_pagamento, 
            pedidoId 
        );
    }

    async buscarPorUsuario(usuarioId: number): Promise<PedidoModel[]> {
        const query = `
            SELECT id, usuario_id, endereco_entrega_id, data_pedido, valor_total, status_pedido, forma_pagamento
            FROM Pedido 
            WHERE usuario_id = ?
            ORDER BY data_pedido DESC
        `;
        
        const [rows] = await executarComandoSQL(query, [usuarioId]) as [RowDataPacket[]];
        const pedidos = rows.map(this.mapPedidoToModel);
        
        for(const pedido of pedidos){
            const itemQuery = `
                SELECT id, pedido_id, livro_id, quantidade, preco_unitario_pago
                FROM ItemPedido
                WHERE pedido_id = ?
            `;

            const [itemRows] = await executarComandoSQL(itemQuery, [pedido.id]) as [RowDataPacket[]];
            pedido.itens = itemRows.map(this.mapItemPedidoToModel);
        }
        return pedidos;
    }
    
    async buscarPorId(id: number): Promise<PedidoModel> {
        const queryPedido = `
            SELECT id, usuario_id, endereco_entrega_id, data_pedido, valor_total, status_pedido, forma_pagamento
            FROM Pedido 
            WHERE id = ?
        `;
        const [pedidoRows] = await executarComandoSQL(queryPedido, [id]) as [RowDataPacket[]];
        
        const pedidoModel = this.mapPedidoToModel(pedidoRows[0]);

        const queryItens = `
            SELECT id, pedido_id, livro_id, quantidade, preco_unitario_pago 
            FROM ItemPedido 
            WHERE pedido_id = ?
        `;
        const [itemRows] = await executarComandoSQL(queryItens, [id]) as [RowDataPacket[]];
        
        pedidoModel.itens = itemRows.map(this.mapItemPedidoToModel);

        return pedidoModel;
    }

    async updateStatus(id: number, status: PedidoStatus): Promise<boolean> {
        const query = `UPDATE Pedido SET status_pedido = ? WHERE id = ?`;
        const resultado: OkPacket = await executarComandoSQL(query, [status, id]) as OkPacket;

        return resultado.affectedRows > 0;
    }

    async buscarItemPorId(id: number): Promise<ItemPedidoModel | undefined> {
        const query = `
            SELECT id, pedido_id, livro_id, quantidade, preco_unitario_pago 
            FROM ItemPedido 
            WHERE id = ?
        `;
        const [rows] = await executarComandoSQL(query, [id]) as [RowDataPacket[]];

        return rows.length > 0 ? this.mapItemPedidoToModel(rows[0]) : undefined;
    }
    
    async removerItem(id: number): Promise<boolean> {
        const query = 'DELETE FROM ItemPedido WHERE id = ?';
        const resultado: OkPacket = await executarComandoSQL(query, [id]) as OkPacket;

        return resultado.affectedRows > 0;
    }
}