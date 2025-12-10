import * as bcrypt from 'bcryptjs';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { UsuarioModel} from '../model/entity/UsuarioModel';
import { TipoUsuario } from '../enums/TipoUsuario';
import { UsuarioRequestDto } from '../model/dto/UsuarioRequestDto';
import { UsuarioResponseDto } from '../model/dto/UsuarioResponseDto';
import { NotFoundError, ConflictError, ValidationError } from '../utils/errors'; 
import { hash } from 'crypto';

export type UsuarioResponseInput = Omit<UsuarioModel, 'senha_hash'>;

type UsuarioUpdateRequestDto = Partial<UsuarioRequestDto>; 

export class UsuarioService {
    private readonly usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository = new UsuarioRepository()) {
        this.usuarioRepository = usuarioRepository;
    }

    private mapToDto(model: UsuarioModel): UsuarioResponseDto {
        const { senha_hash: _, ...safeUser } = model;
        return new UsuarioResponseDto(safeUser as UsuarioResponseInput);
    }

    private validarRequest(data: UsuarioRequestDto | UsuarioUpdateRequestDto, isUpdate: boolean = false): void {
        const { nome, email, senha_hash, telefone } = data as UsuarioRequestDto; 
        const senhaField = senha_hash || data.senha_hash;

        if (!isUpdate && (!nome || !email || !senhaField || !telefone)) {
            throw new ValidationError('Nome, email, senha e telefone são campos obrigatórios.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (email && !emailRegex.test(email)) {
            throw new ValidationError('Formato de email inválido.');
        }

        if (senhaField) {
            if (senhaField.length < 8 || 
                !/[A-Z]/.test(senhaField) || 
                !/[a-z]/.test(senhaField) || 
                !/[0-9]/.test(senhaField)) {
                throw new ValidationError('A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma minúscula e um número.');
            }
        }
    }

    async criarUsuario(data: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        this.validarRequest(data);

        const existingUser = await this.usuarioRepository.buscarUsuarioPorEmail(data.email);
        if (existingUser) {
            throw new ConflictError('O email já está cadastrado no sistema.');
        }

        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(data.senha_hash, salt); 

        const tipo_usuario = data.tipo_usuario || TipoUsuario.CLIENTE; 

        const createdEntity = await this.usuarioRepository.inserirUsuario(
            data.nome, 
            data.email, 
            senha_hash, 
            data.telefone, 
            tipo_usuario,
        );

        return this.mapToDto(createdEntity);
    }

    async listarUsuarios(): Promise<UsuarioResponseDto[]>{
        const usuarios = await this.usuarioRepository.listarUsuarios();
        return usuarios.map(usuario => this.mapToDto(usuario));
        return usuarios.map(usuario => this.mapToDto(usuario));
    }

    async buscarUsuarioPorId(id: number): Promise<UsuarioResponseDto > {
        const entity = await this.usuarioRepository.buscarUsuarioPorId(id); 

        if (!entity) {
            throw new NotFoundError(`Usuário com ID ${id} não encontrado.`);
        }
        return this.mapToDto(entity);
    }

    async atualizarUsuario(id: number, data: UsuarioUpdateRequestDto): Promise<UsuarioResponseDto> {
        this.validarRequest(data, true);

        const existingEntity = await this.usuarioRepository.buscarUsuarioPorId(id);
        if (!existingEntity) {
            throw new NotFoundError(`Usuário com ID ${id} não encontrado para atualização.`);
        }
        
        let newSenhaHash = existingEntity.senha_hash;
        if (data.senha_hash) {
            const salt = await bcrypt.genSalt(10);
            newSenhaHash = await bcrypt.hash(data.senha_hash, salt);
        }

        const updatedEntity = new UsuarioModel(
            data.nome ?? existingEntity.nome,
            data.email ?? existingEntity.email, 
            newSenhaHash,
            data.telefone ?? existingEntity.telefone,
            data.tipo_usuario ?? existingEntity.tipo_usuario,
            id
        );

        const resultEntity = await this.usuarioRepository.atualizarDadosUsuario(updatedEntity);
        if (!resultEntity) {
                throw new NotFoundError(`Falha ao atualizar o usuário ${id}.`);
        }

        return this.mapToDto(resultEntity);
    }

    async removerUsuario(id: number): Promise<void> {
        const existingEntity = await this.usuarioRepository.buscarUsuarioPorId(id);
        if (!existingEntity) {
            throw new NotFoundError(`Usuário com ID ${id} não encontrado para remoção.`);
        }

        const success = await this.usuarioRepository.removerUsuario(existingEntity.email);
        if (!success) {
            throw new Error('Falha ao remover o usuário.'); 
        }
    }
}