"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
exports.fecharConexao = fecharConexao;
const mysql = __importStar(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega variáveis do arquivo .env se estiver rodando localmente
dotenv_1.default.config();
const dbName = process.env.DB_NAME || 'lectus_bd';
// Configuração base (sem o banco de dados específico) para a conexão inicial
const baseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
};
let pool = null;
// Promise que aguarda o pool estar pronto
const poolReady = new Promise((resolve, reject) => {
    // 1. Conecta sem especificar o banco de dados para poder criar se não existir
    const tmpConn = mysql.createConnection(baseConfig);
    tmpConn.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL (verifique as credenciais):', err);
            return reject(err);
        }
        // 2. Cria o database se não existir
        tmpConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`, (err) => {
            // Fecha a conexão temporária independentemente de erro ou sucesso
            tmpConn.end();
            if (err) {
                console.error('Erro ao criar/garantir database:', err);
                return reject(err);
            }
            // 3. Agora cria o pool definitivo apontando para o database correto
            const poolConfig = {
                ...baseConfig,
                database: dbName, // Adiciona o banco especifico aqui
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            };
            pool = mysql.createPool(poolConfig);
            console.log(`Pool MySQL criado e database "${dbName}" assegurado.`);
            resolve();
        });
    });
});
async function executarComandoSQL(query, valores = []) {
    await poolReady;
    return new Promise((resolve, reject) => {
        if (!pool) {
            return reject(new Error('Pool MySQL não inicializado'));
        }
        pool.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query:', query, err);
                return reject(err);
            }
            resolve(resultado);
        });
    });
}
async function fecharConexao() {
    await poolReady;
    return new Promise((resolve, reject) => {
        if (!pool)
            return resolve();
        pool.end((err) => {
            if (err)
                return reject(err);
            console.log('Conexão com o pool MySQL fechada.');
            resolve();
        });
    });
}
