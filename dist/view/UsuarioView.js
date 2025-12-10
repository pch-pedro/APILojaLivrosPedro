"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioView = void 0;
class UsuarioView {
    static formatarUsuario(usuario) {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            tipo_usuario: usuario.tipo_usuario
            // não retornar senha_hash
        };
    }
    static formatarListaUsuarios(usuarios) {
        return {
            total: usuarios.length,
            usuarios: usuarios.map(usuario => this.formatarUsuario(usuario))
        };
    }
    static formatarErro(mensagem, statusCode = 400) {
        return {
            error: true,
            statusCode,
            message: mensagem,
            timestamp: new Date().toISOString()
        };
    }
    static formatarSucesso(dados, mensagem = "Operação realizada com sucesso", statusCode = 200) {
        return {
            success: true,
            statusCode,
            message: mensagem,
            data: dados,
            timestamp: new Date().toISOString()
        };
    }
}
exports.UsuarioView = UsuarioView;
