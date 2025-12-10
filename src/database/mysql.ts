import * as mysql from 'mysql2';
import { Pool } from 'mysql2';
import dotenv from 'dotenv';

// Carrega variáveis do arquivo .env se estiver rodando localmente
dotenv.config();

const dbName = process.env.DB_NAME || 'lectus_bd';

// Configuração base (sem o banco de dados específico) para a conexão inicial
const baseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
};

let pool: Pool | null = null;

// Promise que aguarda o pool estar pronto
const poolReady: Promise<void> = new Promise((resolve, reject) => {
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

export async function executarComandoSQL(query: string, valores: any[] = []): Promise<any> {
    await poolReady;

    return new Promise<any>((resolve, reject) => {
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

export async function fecharConexao(): Promise<void> {
    await poolReady;

    return new Promise<void>((resolve, reject) => {
        if (!pool) return resolve();

        pool.end((err) => {
            if (err) return reject(err);
            console.log('Conexão com o pool MySQL fechada.');
            resolve();
        });
    });
}