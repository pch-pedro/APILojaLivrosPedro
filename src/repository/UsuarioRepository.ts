import { UsuarioModel } from "../model/entity/UsuarioModel";
import { TipoUsuario } from "../enums/TipoUsuario";
import { executarComandoSQL } from "../database/mysql";

export class UsuarioRepository{
    private static instance: UsuarioRepository;

    constructor(){}

    public static async getInstance(): Promise<UsuarioRepository> {
        if (!UsuarioRepository.instance) {
            UsuarioRepository.instance = new UsuarioRepository();
            await UsuarioRepository.instance.createTable(); 
        }
        return UsuarioRepository.instance;
    }

    public async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS Usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                senha_hash VARCHAR(255) NOT NULL,
                telefone VARCHAR(20) NOT NULL,
                tipo_usuario ENUM('CLIENTE', 'ADMIN') NOT NULL
            )`;
        try {
            await executarComandoSQL(query, []);
            console.log("Tabela Usuario criada com sucesso.");
        } catch (err) {
            console.error("Erro ao criar tabela Usuário:", err);
            throw err;
        }
    }

    async inserirUsuario(
        nome: string,
        email: string,
        senha_hash: string,
        telefone: string,
        tipo_usuario: TipoUsuario
    ): Promise<UsuarioModel>{
        const query = `
            INSERT INTO Usuario 
            (nome, email, senha_hash, telefone, tipo_usuario) 
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            const resultado: any = await executarComandoSQL(query, [nome, email, senha_hash, telefone, tipo_usuario]);
            
            const newUsuario = new UsuarioModel(nome, email, senha_hash, telefone, tipo_usuario);
            return newUsuario;
        } catch (err) {
            console.error("Erro ao inserir usuário no repositório:", err);
            throw err;
        }
    }

    async buscarUsuarioPorId(id: number): Promise<UsuarioModel | undefined>{
        const query = "SELECT id, nome, email, senha_hash, telefone, tipo_usuario FROM Usuario WHERE id = ?";
        try {
            const resultado: any = await executarComandoSQL(query, [id]);
            
            if (resultado.length > 0) {
                const row = resultado[0];
                return new UsuarioModel(
                    row.nome,
                    row.email,
                    row.senha_hash,
                    row.telefone,
                    row.tipo_usuario as TipoUsuario,
                );
            }
            return undefined;
        } catch (err) {
            console.error("Erro ao buscar usuário por ID no repositório:", err);
            throw err;
        }
    }

    async buscarUsuarioPorEmail(email: string): Promise<UsuarioModel | undefined>{
        const query = "SELECT id, nome, email, senha_hash, telefone, tipo_usuario FROM Usuario WHERE email = ?";
        try {
            const resultado: any = await executarComandoSQL(query, [email]);
            
            if (resultado.length > 0) {
                const row = resultado[0];
                return new UsuarioModel(
                    row.nome,
                    row.email,
                    row.senha_hash,
                    row.telefone,
                    row.tipo_usuario as TipoUsuario,
                );
            }
            return undefined;
        } catch (err) {
            console.error("Erro ao buscar usuário por email no repositório:", err);
            throw err;
        }
    }

    async listarUsuarios(): Promise<UsuarioModel[]>{
        const query = "SELECT id, nome, email, senha_hash, telefone, tipo_usuario FROM Usuario";
        try {
            const resultado: any = await executarComandoSQL(query, []);
            
            return resultado.map((row: any) => new UsuarioModel(
                row.nome,
                row.email,
                row.senha_hash,
                row.telefone,
                row.tipo_usuario as TipoUsuario,
            ));
        } catch (err) {
            console.error("Erro ao listar usuários no repositório:", err);
            throw err;
        }
    }

    async atualizarDadosUsuario(usuario: UsuarioModel): Promise<UsuarioModel | undefined> {
        const query = `
            UPDATE Usuario
            SET nome = ?, senha_hash = ?, telefone = ?, tipo_usuario = ?
            WHERE email = ?`;
        
        try {
            const resultado: any = await executarComandoSQL(query, [
                usuario.nome,
                usuario.senha_hash,
                usuario.telefone,
                usuario.tipo_usuario,
                usuario.email,
            ]);

            if (resultado.affectedRows > 0) {
                return this.buscarUsuarioPorEmail(usuario.email);
            }
            return undefined;
        } catch (err) {
            console.error("Erro ao atualizar usuário no repositório:", err);
            throw err;
        }
    }

    async removerUsuario(email: string): Promise<boolean> {
        const query = "DELETE FROM Usuario WHERE email = ?";
        try {
            const resultado: any = await executarComandoSQL(query, [email]);
            
            return resultado.affectedRows > 0;
        } catch (err) {
            console.error("Erro ao remover usuário no repositório:", err);
            throw err;
        }
    }
}