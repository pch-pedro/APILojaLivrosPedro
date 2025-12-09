import * as mysql from 'mysql2';
import { Pool } from 'mysql2';

const dbName = 'lectus_bd';

// Config inicial sem database
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Pedro@2025'
};

let pool: Pool | null = null;

// Promise que aguarda o pool estar pronto (após garantir que o database existe)
const poolReady: Promise<void> = new Promise((resolve, reject) => {
    const tmpConn = mysql.createConnection(dbConfig);

    tmpConn.connect((err) => {
        if (err) {
            console.error('Erro ao conectar para criar database:', err);
            return reject(err);
        }

        // Cria o database se não existir
        tmpConn.query(
            `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
            (err) => {
                if (err) {
                    tmpConn.end();
                    console.error('Erro ao criar/garantir database:', err);
                    return reject(err);
                }

                tmpConn.end();

                // Cria o pool apontando para o database recém-criado
                pool = mysql.createPool({
                    ...dbConfig,
                    database: dbName,
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0
                });

                console.log(`Pool MySQL criado e database "${dbName}" assegurado.`);
                resolve();
            }
        );
    });
});

export async function executarComandoSQL(query: string, valores: any[] = []): Promise<any> {
    await poolReady;

    return new Promise<any>((resolve, reject) => {
        if (!pool) return reject(new Error('Pool MySQL não inicializado'));

        pool.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
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
