"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoRepository = void 0;
const mysql_1 = require("../database/mysql");
const PedidoModel_1 = require("../model/entity/PedidoModel");
const ItemPedidoModel_1 = require("../model/entity/ItemPedidoModel");
class PedidoRepository {
    static instance;
    constructor() { }
    static async getInstance() {
        if (!PedidoRepository.instance) {
            PedidoRepository.instance = new PedidoRepository();
            await PedidoRepository.instance.createTable();
            await PedidoRepository.instance.criarItemPedidoTable();
        }
        return PedidoRepository.instance;
    }
    mapPedidoToModel(row) {
        return new PedidoModel_1.PedidoModel(row.usuario_id, row.endereco_entrega_id, row.data_pedido, row.valor_total, row.status_pedido, row.forma_pagamento, row.id);
    }
    mapItemPedidoToModel(row) {
        return new ItemPedidoModel_1.ItemPedidoModel(row.pedido_id, row.livro_id, row.quantidade, row.preco_unitario_pago, row.id);
    }
    async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS Pedido (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                endereco_entrega_id INT NOT NULL,
                data_pedido DATETIME NOT NULL, 
                valor_total DECIMAL(10,2) NOT NULL,
                status_pedido ENUM('PENDENTE', 'PROCESSANDO', 'ENVIADO', 'ENTREGUE', 'CANCELADO') NOT NULL,
                -- NOVO CAMPO COM ENUM
                forma_pagamento ENUM('PIX', 'CARTAO_CREDITO', 'BOLETO', 'TRANSFERENCIA') NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
                FOREIGN KEY (endereco_entrega_id) REFERENCES Endereco(id)
            )`;
        try {
            await (0, mysql_1.executarComandoSQL)(query, []);
        }
        catch (err) {
            console.error("Erro ao criar tabela Pedido:", err);
            throw err;
        }
    }
    async criarItemPedidoTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS ItemPedido (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pedido_id INT NOT NULL,
                livro_id INT NOT NULL,
                quantidade INT NOT NULL,
                preco_unitario_pago DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (pedido_id) REFERENCES Pedido(id) ON DELETE CASCADE,
                FOREIGN KEY (livro_id) REFERENCES Livro(id)
            )`;
        await (0, mysql_1.executarComandoSQL)(query, []);
    }
    async inserirPedido(pedidoData, itensData) {
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
        const resultadoPedido = await (0, mysql_1.executarComandoSQL)(pedidoQuery, pedidoValues);
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
            return (0, mysql_1.executarComandoSQL)(itemQuery, itemValues);
        });
        await Promise.all(itemQueries);
        return new PedidoModel_1.PedidoModel(pedidoData.usuario_id, pedidoData.endereco_entrega_id, pedidoData.data_pedido, pedidoData.valor_total, pedidoData.status_pedido, pedidoData.forma_pagamento, pedidoId);
    }
    async buscarPorUsuario(usuarioId) {
        const query = `
            SELECT id, usuario_id, endereco_entrega_id, data_pedido, valor_total, status_pedido, forma_pagamento
            FROM Pedido 
            WHERE usuario_id = ?
            ORDER BY data_pedido DESC
        `;
        try {
            const [rows] = await (0, mysql_1.executarComandoSQL)(query, [usuarioId]);
            return rows.map(this.mapPedidoToModel);
        }
        catch (err) {
            console.error("Erro ao listar pedidos por Usuario ID no repositório:", err);
            throw err;
        }
    }
    async buscarPorId(id) {
        const queryPedido = `
            SELECT id, usuario_id, endereco_entrega_id, data_pedido, valor_total, status_pedido, forma_pagamento
            FROM Pedido 
            WHERE id = ?
        `;
        const [pedidoRows] = await (0, mysql_1.executarComandoSQL)(queryPedido, [id]);
        const pedidoModel = this.mapPedidoToModel(pedidoRows[0]);
        const queryItens = `
            SELECT id, pedido_id, livro_id, quantidade, preco_unitario_pago 
            FROM ItemPedido 
            WHERE pedido_id = ?
        `;
        const [itemRows] = await (0, mysql_1.executarComandoSQL)(queryItens, [id]);
        pedidoModel.itens = itemRows.map(this.mapItemPedidoToModel);
        return pedidoModel;
    }
    async updateStatus(id, status) {
        const query = `UPDATE Pedido SET status_pedido = ? WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [status, id]);
        return resultado.affectedRows > 0;
    }
}
exports.PedidoRepository = PedidoRepository;
