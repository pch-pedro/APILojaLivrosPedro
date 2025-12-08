"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaModel = void 0;
class CategoriaModel {
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
exports.CategoriaModel = CategoriaModel;
