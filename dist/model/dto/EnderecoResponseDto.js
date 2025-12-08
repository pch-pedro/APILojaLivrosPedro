"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoResponseDto = void 0;
class EnderecoResponseDto {
    id;
    usuario_id;
    cep;
    rua;
    numero;
    complemento;
    cidade;
    estado;
    constructor(endereco) {
        this.id = endereco.id;
        this.usuario_id = endereco.usuario_id;
        this.cep = endereco.cep;
        this.rua = endereco.rua;
        this.numero = endereco.numero;
        this.complemento = endereco.complemento;
        this.cidade = endereco.cidade;
        this.estado = endereco.estado;
    }
}
exports.EnderecoResponseDto = EnderecoResponseDto;
