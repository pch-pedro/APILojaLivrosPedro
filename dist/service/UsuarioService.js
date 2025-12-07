"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
class UsuarioController {
    //Validar E-mail
    validarEmail(email) {
        if (email.includes("@")) {
            return true;
        }
        return false;
    }
    //Validar Telefone
    validarTelefone(telefone) {
        if (telefone.length == 11) {
            return true;
        }
        return false;
    }
    //Validar Tipo
    validarTipo(tipo) {
        if (tipo.toLocaleUpperCase() == "CLIENTE") {
            return true;
        }
        else if (tipo.toLocaleUpperCase() == "ADMIN") {
            return true;
        }
        return false;
    }
    //Criar Usuário
    criarUsuario() {
    }
}
exports.UsuarioController = UsuarioController;
