"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoService = void 0;
const EnderecoRepository_1 = require("../repository/EnderecoRepository");
const EnderecoResponseDto_1 = require("../model/dto/EnderecoResponseDto");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const errors_1 = require("../utils/errors");
class EnderecoService {
    enderecoRepository;
    usuarioRepository;
    constructor(enderecoRepository = new EnderecoRepository_1.EnderecoRepository(), usuarioRepository = new UsuarioRepository_1.UsuarioRepository()) {
        this.enderecoRepository = enderecoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    validarRequest(data, isUpdate = false) {
        const { usuario_id, cep, rua, numero, cidade, estado } = data;
        if (!isUpdate && (!usuario_id || !cep || !rua || !numero || !cidade || !estado)) {
            throw new errors_1.ValidationError('CEP, rua, número, cidade e estado são obrigatórios.');
        }
        if (usuario_id && (!Number.isInteger(usuario_id) || usuario_id <= 0)) {
            throw new errors_1.ValidationError('ID de Usuário inválido.');
        }
        if (estado && estado.length !== 2) {
            throw new errors_1.ValidationError('Estado deve ser fornecido com a sigla de 2 caracteres (ex: SP, RJ).');
        }
    }
    mapToDto(model) {
        const safeData = {
            id: model.id,
            usuario_id: model.usuario_id,
            cep: model.cep,
            rua: model.rua,
            numero: model.numero,
            complemento: model.complemento,
            cidade: model.cidade,
            estado: model.estado,
        };
        return new EnderecoResponseDto_1.EnderecoResponseDto(safeData);
    }
    async criarEndereco(data) {
        this.validarRequest(data);
        const usuarioExiste = await this.usuarioRepository.buscarUsuarioPorId(data.usuario_id);
        if (!usuarioExiste) {
            throw new errors_1.NotFoundError(`Usuário com ID ${data.usuario_id} não encontrado. Não é possível cadastrar o endereço.`);
        }
        const createData = data;
        const createdEntity = await this.enderecoRepository.inserirEndereco(createData);
        return this.mapToDto(createdEntity);
    }
    async buscarEnderecoPorId(id) {
        if (!id || id <= 0) {
            throw new errors_1.ValidationError('ID de endereço inválido.');
        }
        const entity = await this.enderecoRepository.buscarPorId(id);
        if (!entity) {
            throw new errors_1.NotFoundError(`Endereço com ID ${id} não encontrado.`);
        }
        return this.mapToDto(entity);
    }
    async listarEnderecosPorUsuario(usuarioId) {
        if (!usuarioId || usuarioId <= 0) {
            throw new errors_1.ValidationError('ID de Usuário inválido.');
        }
        const usuarioExiste = await this.usuarioRepository.buscarUsuarioPorId(usuarioId);
        if (!usuarioExiste) {
            throw new errors_1.NotFoundError(`Usuário com ID ${usuarioId} não encontrado.`);
        }
        const entities = await this.enderecoRepository.buscarUsuarioPorId(usuarioId);
        return entities.map(this.mapToDto);
    }
    async atualizarEndereco(id, data) {
        if (!id || id <= 0) {
            throw new errors_1.ValidationError('ID de endereço inválido.');
        }
        this.validarRequest(data, true);
        if (data.usuario_id !== undefined) {
            throw new errors_1.ValidationError('A alteração do ID do usuário não é permitida diretamente na atualização do endereço.');
        }
        const updatedEntity = await this.enderecoRepository.atualizarDadosEndereco(id, data);
        if (!updatedEntity) {
            throw new errors_1.NotFoundError(`Endereço com ID ${id} não encontrado para atualização.`);
        }
        return this.mapToDto(updatedEntity);
    }
    async removerEndereco(id) {
        if (!id || id <= 0) {
            throw new errors_1.ValidationError('ID de endereço inválido.');
        }
        const success = await this.enderecoRepository.removerEndereco(id);
        if (!success) {
            throw new errors_1.NotFoundError(`Endereço com ID ${id} não encontrado para remoção.`);
        }
    }
}
exports.EnderecoService = EnderecoService;
