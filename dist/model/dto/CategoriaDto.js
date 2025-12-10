"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaDto = void 0;
class CategoriaDto {
    id;
    nome;
    constructor(nome, id) {
        this.id = id;
        this.nome = nome;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    //SETTERS
    setNome(nome) {
        this.nome = nome;
    }
}
exports.CategoriaDto = CategoriaDto;
