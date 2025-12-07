"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroController_1 = require("./../controller/LivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "categoria_id": { "dataType": "double", "required": true },
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "isbn": { "dataType": "string", "required": true },
            "preco": { "dataType": "double", "required": true },
            "estoque": { "dataType": "double", "required": true },
            "sinopse": { "dataType": "string", "required": true },
            "imageURL": { "dataType": "string", "required": true },
            "editora": { "dataType": "string", "required": true },
            "data_publicacao": { "dataType": "datetime", "required": true },
            "promocao": { "dataType": "boolean", "default": false },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsLivroController_criarLivro = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.criarLivro)), async function LivroController_criarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_criarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'criarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_listarLivros = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "202", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.listarLivros)), async function LivroController_listarLivros(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_filtrarLivro = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro/:id', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.filtrarLivro)), async function LivroController_filtrarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_filtrarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'filtrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_atualizarLivro = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/livro/:id', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.atualizarLivro)), async function LivroController_atualizarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_removerLivro = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/livro/:id', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.removerLivro)), async function LivroController_removerLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'removerLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
