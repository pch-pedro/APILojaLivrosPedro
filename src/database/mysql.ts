import dotenv from 'dotenv';
dotenv.config();
import mysql, { Pool } from 'mysql2';

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

let pool: Pool | null = null;

// Promise que indica quando o pool estiver pronto (após criar o DB se necessário)
const poolReady: Promise<void> = new Promise((resolve, reject) => {
    const tmpConn = mysql.createConnection(dbConfig);
    // cria o database caso não exista
    tmpConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`, (err) => {
        tmpConn.end();
        if (err) {
            console.error('Erro ao garantir database:', err);
            return reject(err);
        }

        // agora cria o pool apontando para o database
        pool = mysql.createPool(poolConfig);
        console.log('Pool MySQL criado e database assegurado:', dbName);
        resolve();
    });
});

export async function executarComandoSQL(query: string, valores: any[] = []): Promise<any> {
    await poolReady;
    return new Promise((resolve, reject) => {
        if (!pool) return reject(new Error('Pool MySQL não inicializado'));
        pool.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query. ', err);
                return reject(err);
            }
            resolve(resultado);
        });
    });
}

export async function fecharConexao(): Promise<void> {
    await poolReady;
    return new Promise((resolve, reject) => {
        if (!pool) return resolve();
        pool.end((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}