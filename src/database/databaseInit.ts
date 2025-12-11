import { UsuarioRepository } from '../repository/UsuarioRepository.js';
import { EnderecoRepository } from '../repository/EnderecoRepository.js';
import { LivroRepository } from '../repository/LivroRepository.js';
import { CategoriaRepository } from '../repository/CategoriaRepository.js';
import { PedidoRepository } from '../repository/PedidoRepository.js';
import { CarrinhoRepository } from '../repository/CarrinhoRepository.js';

export async function inicializarTabelas() {
    console.log("⬆️ Iniciando criação das tabelas...");

    await UsuarioRepository.getInstance();
    console.log("✔ Usuario OK");

    await CategoriaRepository.getInstance();
    console.log("✔ Categoria OK");

    await EnderecoRepository.getInstance();
    console.log("✔ Endereco OK");

    await LivroRepository.getInstance();
    console.log("✔ Livro OK");

    await PedidoRepository.getInstance();
    console.log("✔ Pedido OK");

    await CarrinhoRepository.getInstance();
    console.log("✔ Carrinho OK");

    console.log("🎉 Todas as tabelas criadas com sucesso!");
}
