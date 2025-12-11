import { Controller, Route, Tags, Path, Delete, Res, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ItemPedidoService } from "../service/ItemPedidoService"; 
import { NotFoundError, ConflictError, ValidationError } from '../utils/errors'; 

type ItemFailResponse = TsoaResponse<400 | 404 | 409 | 500, BasicResponseDto>;

const itemPedidoService = new ItemPedidoService(); 

@Route("item-pedido") 
@Tags("ItemPedido")
export class ItemPedidoController extends Controller {

    @Delete("{itemId}")
    public async removerItem(
        @Path() itemId: number,
        @Res() fail: ItemFailResponse, 
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await itemPedidoService.removeItemDoPedido(itemId);
            
            return success(200, new BasicResponseDto(`Item de pedido ${itemId} removido com sucesso.`, undefined));
            
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined)); 
            }
            if (err instanceof ConflictError) {
                return fail(409, new BasicResponseDto(err.message, undefined));
            }
            if (err instanceof ValidationError) {
                return fail(400, new BasicResponseDto(err.message, undefined));
            }
            
            return fail(500, new BasicResponseDto(`Erro interno: ${err.message}`, undefined));
        }
    }
}