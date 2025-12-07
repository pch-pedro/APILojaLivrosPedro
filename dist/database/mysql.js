"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
exports.fecharConexao = fecharConexao;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mysql2_1 = __importDefault(require("mysql2"));
const dbName = process.env.MYSQLDATABASE || 'lectus_db';
const dbConfig = {
    host: process.env.MYSQLHOST || 'localhost',
    port: Number(process.env.MYSQLPORT || 3306),
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'root'
};
// Config para o pool já com database
const poolConfig = {
    ...dbConfig,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
let pool = null;
// Promise que indica quando o pool estiver pronto (após criar o DB se necessário)
const poolReady = new Promise((resolve, reject) => {
    const tmpConn = mysql2_1.default.createConnection(dbConfig);
    // cria o database caso não exista
    tmpConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`, (err) => {
        tmpConn.end();
        if (err) {
            console.error('Erro ao garantir database:', err);
            return reject(err);
        }
        // agora cria o pool apontando para o database
        pool = mysql2_1.default.createPool(poolConfig);
        console.log('Pool MySQL criado e database assegurado:', dbName);
        resolve();
    });
});
async function executarComandoSQL(query, valores = []) {
    await poolReady;
    return new Promise((resolve, reject) => {
        if (!pool)
            return reject(new Error('Pool MySQL não inicializado'));
        pool.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query. ', err);
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
            resolve();
        });
    });
}
