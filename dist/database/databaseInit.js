"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inicializarTabelas = inicializarTabelas;
const UsuarioRepository_js_1 = require("../repository/UsuarioRepository.js");
const EnderecoRepository_js_1 = require("../repository/EnderecoRepository.js");
const LivroRepository_js_1 = require("../repository/LivroRepository.js");
const CategoriaRepository_js_1 = require("../repository/CategoriaRepository.js");
const PedidoRepository_js_1 = require("../repository/PedidoRepository.js");
const CarrinhoRepository_js_1 = require("../repository/CarrinhoRepository.js");
async function inicializarTabelas() {
    console.log("⬆️ Iniciando criação das tabelas...");
    await UsuarioRepository_js_1.UsuarioRepository.getInstance();
    console.log("✔ 1. Usuario OK");
    await CategoriaRepository_js_1.CategoriaRepository.getInstance();
    console.log("✔ 2. Categoria OK");
    try {
        await EnderecoRepository_js_1.EnderecoRepository.getInstance();
        console.log("✔ 3. Endereco OK");
    }
    catch (err) {
        console.error("❌ Erro ao criar tabela Endereco:", err);
        throw err;
    }
    await LivroRepository_js_1.LivroRepository.getInstance();
    console.log("✔ 4. Livro OK");
    await PedidoRepository_js_1.PedidoRepository.getInstance();
    console.log("✔ 5. Pedido OK");
    await CarrinhoRepository_js_1.CarrinhoRepository.getInstance();
    console.log("✔ 6. Carrinho OK");
    console.log("🎉 Todas as tabelas criadas com sucesso!");
}
