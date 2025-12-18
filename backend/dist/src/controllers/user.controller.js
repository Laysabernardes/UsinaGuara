"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const user_service_1 = require("../services/user.service");
let UserController = class UserController extends tsoa_1.Controller {
    /**
     * Cria um novo usuário no sistema.
     * @param body Dados obrigatórios do usuário (email, password, etc)
     * @summary Registrar novo usuário
     */
    async createUser(body) {
        try {
            const user = await user_service_1.UserService.create(body);
            this.setStatus(201);
            return user;
        }
        catch (error) {
            this.setStatus(409);
            return { message: error.message };
        }
    }
    /**
     * Lista todos os usuários cadastrados.
     * @summary Listar usuários
     */
    async findUsers() {
        return await user_service_1.UserService.findAll();
    }
    /**
     * Lista todos os usuários cadastrados.
     * @summary Listar usuários
     */
    async getUserById(id) {
        const user = await user_service_1.UserService.findById(id);
        if (!user) {
            this.setStatus(404);
            return { message: "Usuário não encontrado" };
        }
        return user;
    }
    /**
     * Atualiza informações de um usuário existente.
     * @param id ID do usuário a ser modificado
     * @param body Campos opcionais para atualização
     */
    async updateUser(id, body) {
        const updatedUser = await user_service_1.UserService.update(id, body);
        if (!updatedUser) {
            this.setStatus(404);
            return { message: "Usuário não encontrado para atualizar" };
        }
        return updatedUser;
    }
    /**
     * Remove um usuário do sistema.
     * @param id ID do usuário a ser excluído
     */
    async deleteUser(id) {
        try {
            await user_service_1.UserService.delete(id);
            this.setStatus(204);
        }
        catch (error) {
            this.setStatus(404);
            throw error;
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Response)("409", "Conflict - Email já está em uso"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    (0, tsoa_1.Response)("404", "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    (0, tsoa_1.Response)("404", "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    (0, tsoa_1.SuccessResponse)("204", "No Content"),
    (0, tsoa_1.Response)("404", "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("users"),
    (0, tsoa_1.Tags)("Users"),
    (0, tsoa_1.Security)("jwt")
], UserController);
//# sourceMappingURL=user.controller.js.map