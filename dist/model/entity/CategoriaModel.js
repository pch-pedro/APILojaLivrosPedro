"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaModel = void 0;
class CategoriaModel {
    static proximoId = 1;
    id;
    titulo;
    nome;
    constructor(titulo, nome) {
        this.id = CategoriaModel.proximoId++;
        this.titulo = titulo;
        this.nome = nome;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getTitulo() {
        return this.titulo;
    }
    getNome() {
        return this.nome;
    }
    //SETTERS
    setTitulo(titulo) {
        this.titulo = titulo;
    }
    setNome(nome) {
        this.nome = nome;
    }
}
exports.CategoriaModel = CategoriaModel;
