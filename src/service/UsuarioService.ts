import * as bcrypt from 'bcryptjs'; // Certifique-se de instalar: npm install bcryptjs @types/bcryptjs
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { UsuarioModel, TipoUsuario } from '../model/entity/UsuarioModel';
import { UsuarioRequestDto } from '../model/dto/UsuarioRequestDto';
import { UsuarioResponseDto } from '../model/dto/UsuarioResponseDto';
import { NotFoundError, ConflictError, ValidationError } from '../utils/errors'; 

type UsuarioUpdateRequestDto = Partial<UsuarioRequestDto>; 

export class UsuarioService {
    private readonly usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository = new UsuarioRepository()) {
        this.usuarioRepository = usuarioRepository;
    }
    

    private validateRequest(data: UsuarioRequestDto | UsuarioUpdateRequestDto, isUpdate: boolean = false): void {
        const { nome, email, senha_hash, telefone } = data;
        
        if (!isUpdate) {
            if (!nome || !email || !senha_hash || !telefone) {
                throw new ValidationError('Nome, email, senha e telefone são campos obrigatórios.');
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (email && !emailRegex.test(email)) {
            throw new ValidationError('Formato de email inválido.');
        }

        if (senha_hash) {
            if (senha_hash.length < 8 || 
                !/[A-Z]/.test(senha_hash) || 
                !/[a-z]/.test(senha_hash) || 
                !/[0-9]/.test(senha_hash)) {
                throw new ValidationError('A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma minúscula e um número.');
            }
        }
    }

    async createUsuario(data: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        this.validateRequest(data);

        const existingUser = await this.usuarioRepository.buscarUsuarioPorEmail(data.email);
        if (existingUser) {
            throw new ConflictError('O email já está cadastrado no sistema.');
        }

        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(data.senha_hash, salt);

        const tipo_usuario = data.tipo_usuario || TipoUsuario.CLIENTE; 
        
        const createdEntity = await this.usuarioRepository.insertUsuario(
            data.nome, 
            data.email, 
            senha_hash, 
            data.telefone, 
            tipo_usuario,
        );

        const { senha_hash: _, ...safeUser } = createdEntity;

        return new UsuarioResponseDto(createdEntity);
    }


    async getUsuarioById(id: number): Promise<UsuarioResponseDto> {
        const entity = await this.usuarioRepository.buscarUsuarioPorId(id);

        if (!entity) {
            throw new NotFoundError(`Usuário com ID ${id} não encontrado.`);
        }

        return new UsuarioResponseDto(entity);
    }

    async updateUsuario(id: number, data: UsuarioUpdateRequestDto): Promise<UsuarioResponseDto> {
        this.validateRequest(data, true);

        const existingEntity = await this.usuarioRepository.buscarUsuarioPorId(id);
        if (!existingEntity) {
            throw new NotFoundError(`Usuário com ID ${id} não encontrado para atualização.`);
        }
        
        let newSenhaHash = existingEntity.senha_hash;
        if (data.senha_hash) {
            const salt = await bcrypt.genSalt(10);
            newSenhaHash = await bcrypt.hash(data.senha_hash, salt);
        }

        // 3. Cria a Entity atualizada
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

        return new UsuarioResponseDto(resultEntity);
    }

    async deleteUsuario(id: number): Promise<void> {
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