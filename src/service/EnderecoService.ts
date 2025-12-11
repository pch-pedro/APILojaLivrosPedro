import { EnderecoModel } from '../model/entity/EnderecoModel';
import { EnderecoRepository } from '../repository/EnderecoRepository';
import { EnderecoRequestDto } from '../model/dto/EnderecoRequestDto';
import { EnderecoResponseDto } from '../model/dto/EnderecoResponseDto';
import { UsuarioRepository } from '../repository/UsuarioRepository'; 
import { NotFoundError, ValidationError } from '../utils/errors'; 

export type EnderecoResponseInput = {
    id: number;
    usuario_id: number; 
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    cidade: string;
    estado: string;
};

type EnderecoCreateData = Omit<EnderecoModel, 'id'>;

type EnderecoUpdateRequestDto = Partial<EnderecoRequestDto>;

export class EnderecoService {

    private readonly enderecoRepository: EnderecoRepository;
    private readonly usuarioRepository: UsuarioRepository; 

    constructor(
        enderecoRepository: EnderecoRepository = new EnderecoRepository(), 
        usuarioRepository: UsuarioRepository = new UsuarioRepository()
    ) {
        this.enderecoRepository = enderecoRepository;
        this.usuarioRepository = usuarioRepository; 
    }

    private validarRequest(data: EnderecoRequestDto | EnderecoUpdateRequestDto, isUpdate: boolean = false): void {
        const { usuario_id, cep, rua, numero, cidade, estado } = data;

        if (!isUpdate && (!usuario_id || !cep || !rua || !numero || !cidade || !estado)) {
            throw new ValidationError('CEP, rua, número, cidade e estado são obrigatórios.');
        }
        
        if (usuario_id && (!Number.isInteger(usuario_id) || usuario_id <= 0)) {
            throw new ValidationError('ID de Usuário inválido.');
        }
        
        if (estado && estado.length !== 2) {
            throw new ValidationError('Estado deve ser fornecido com a sigla de 2 caracteres (ex: SP, RJ).');
        }
    }

    private mapToDto(model: EnderecoModel): EnderecoResponseDto {
        const safeData: EnderecoResponseInput = {
            id: model.id as number, 
            usuario_id: model.usuario_id,
            cep: model.cep,
            rua: model.rua,
            numero: model.numero,
            complemento: model.complemento,
            cidade: model.cidade,
            estado: model.estado,
        };
        return new EnderecoResponseDto(safeData); 
    }
    
    async criarEndereco(data: EnderecoRequestDto): Promise<EnderecoResponseDto> {
        this.validarRequest(data);
        
        const usuarioExiste = await this.usuarioRepository.buscarUsuarioPorId(data.usuario_id);
        if (!usuarioExiste) {
            throw new NotFoundError(`Usuário com ID ${data.usuario_id} não encontrado. Não é possível cadastrar o endereço.`);
        }

        const createData: EnderecoCreateData = data as EnderecoCreateData;

        const createdEntity = await this.enderecoRepository.inserirEndereco(createData);
        return this.mapToDto(createdEntity);
    }
    
    async buscarEnderecoPorId(id: number): Promise<EnderecoResponseDto> {
        if (!id || id <= 0) {
            throw new ValidationError('ID de endereço inválido.');
        }
        
        const entity = await this.enderecoRepository.buscarPorId(id);

        if (!entity) {
            throw new NotFoundError(`Endereço com ID ${id} não encontrado.`);
        }

        return this.mapToDto(entity);
    }

    async listarEnderecosPorUsuario(usuarioId: number): Promise<EnderecoResponseDto[]> {
        if (!usuarioId || usuarioId <= 0) {
            throw new ValidationError('ID de Usuário inválido.');
        }

        const usuarioExiste = await this.usuarioRepository.buscarUsuarioPorId(usuarioId);
        if (!usuarioExiste) {
            throw new NotFoundError(`Usuário com ID ${usuarioId} não encontrado.`);
        }

        const entities = await this.enderecoRepository.buscarUsuarioPorId(usuarioId);
        return entities.map(this.mapToDto);
    }

    async atualizarEndereco(id: number, data: EnderecoUpdateRequestDto): Promise<EnderecoResponseDto> {
        if (!id || id <= 0) {
            throw new ValidationError('ID de endereço inválido.');
        }
        this.validarRequest(data, true);

        if (data.usuario_id !== undefined) {
            throw new ValidationError('A alteração do ID do usuário não é permitida diretamente na atualização do endereço.');
        }

        const updatedEntity = await this.enderecoRepository.atualizarDadosEndereco(id, data);
        if (!updatedEntity) {
            throw new NotFoundError(`Endereço com ID ${id} não encontrado para atualização.`);
        }

        return this.mapToDto(updatedEntity);
    }

    async removerEndereco(id: number): Promise<void> {
        if (!id || id <= 0) {
            throw new ValidationError('ID de endereço inválido.');
        }

        const success = await this.enderecoRepository.removerEndereco(id);
        if (!success) {
            throw new NotFoundError(`Endereço com ID ${id} não encontrado para remoção.`);
        }
    }
}