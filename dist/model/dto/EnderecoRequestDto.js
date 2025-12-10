"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoRequestDto = void 0;
class EnderecoRequestDto {
    usuario_id;
    cep;
    rua;
    numero;
    complemento;
    cidade;
    estado;
    constructor(usuario_id, cep, rua, numero, complemento, cidade, estado) {
        this.usuario_id = usuario_id;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
    }
}
exports.EnderecoRequestDto = EnderecoRequestDto;
