"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const bcrypt = __importStar(require("bcryptjs")); // Certifique-se de instalar: npm install bcryptjs @types/bcryptjs
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const UsuarioModel_1 = require("../model/entity/UsuarioModel");
const UsuarioResponseDto_1 = require("../model/dto/UsuarioResponseDto");
const errors_1 = require("../utils/errors");
class UsuarioService {
    usuarioRepository;
    constructor(usuarioRepository = new UsuarioRepository_1.UsuarioRepository()) {
        this.usuarioRepository = usuarioRepository;
    }
    validateRequest(data, isUpdate = false) {
        const { nome, email, senha_hash, telefone } = data;
        if (!isUpdate) {
            if (!nome || !email || !senha_hash || !telefone) {
                throw new errors_1.ValidationError('Nome, email, senha e telefone são campos obrigatórios.');
            }
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            throw new errors_1.ValidationError('Formato de email inválido.');
        }
        if (senha_hash) {
            if (senha_hash.length < 8 ||
                !/[A-Z]/.test(senha_hash) ||
                !/[a-z]/.test(senha_hash) ||
                !/[0-9]/.test(senha_hash)) {
                throw new errors_1.ValidationError('A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma minúscula e um número.');
            }
        }
    }
    async createUsuario(data) {
        this.validateRequest(data);
        const existingUser = await this.usuarioRepository.buscarUsuarioPorEmail(data.email);
        if (existingUser) {
            throw new errors_1.ConflictError('O email já está cadastrado no sistema.');
        }
        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(data.senha_hash, salt);
        const tipo_usuario = data.tipo_usuario || UsuarioModel_1.TipoUsuario.CLIENTE;
        const createdEntity = await this.usuarioRepository.insertUsuario(data.nome, data.email, senha_hash, data.telefone, tipo_usuario);
        const { senha_hash: _, ...safeUser } = createdEntity;
        return new UsuarioResponseDto_1.UsuarioResponseDto(createdEntity);
    }
    async getUsuarioById(id) {
        const entity = await this.usuarioRepository.buscarUsuarioPorId(id);
        if (!entity) {
            throw new errors_1.NotFoundError(`Usuário com ID ${id} não encontrado.`);
        }
        return new UsuarioResponseDto_1.UsuarioResponseDto(entity);
    }
    async updateUsuario(id, data) {
        this.validateRequest(data, true);
        const existingEntity = await this.usuarioRepository.buscarUsuarioPorId(id);
        if (!existingEntity) {
            throw new errors_1.NotFoundError(`Usuário com ID ${id} não encontrado para atualização.`);
        }
        let newSenhaHash = existingEntity.senha_hash;
        if (data.senha_hash) {
            const salt = await bcrypt.genSalt(10);
            newSenhaHash = await bcrypt.hash(data.senha_hash, salt);
        }
        // 3. Cria a Entity atualizada
        const updatedEntity = new UsuarioModel_1.UsuarioModel(data.nome ?? existingEntity.nome, data.email ?? existingEntity.email, newSenhaHash, data.telefone ?? existingEntity.telefone, data.tipo_usuario ?? existingEntity.tipo_usuario, id);
        const resultEntity = await this.usuarioRepository.atualizarDadosUsuario(updatedEntity);
        if (!resultEntity) {
            throw new errors_1.NotFoundError(`Falha ao atualizar o usuário ${id}.`);
        }
        return new UsuarioResponseDto_1.UsuarioResponseDto(resultEntity);
    }
    async deleteUsuario(id) {
        const existingEntity = await this.usuarioRepository.buscarUsuarioPorId(id);
        if (!existingEntity) {
            throw new errors_1.NotFoundError(`Usuário com ID ${id} não encontrado para remoção.`);
        }
        const success = await this.usuarioRepository.removerUsuario(existingEntity.email);
        if (!success) {
            throw new Error('Falha ao remover o usuário.');
        }
    }
}
exports.UsuarioService = UsuarioService;
