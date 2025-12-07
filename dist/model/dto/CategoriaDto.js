"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaDto = void 0;
class CategoriaDto {
    static proximoId = 1;
    id;
    titulo;
    nome;
    constructor(titulo, nome) {
        this.id = CategoriaDto.proximoId++;
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
exports.CategoriaDto = CategoriaDto;
