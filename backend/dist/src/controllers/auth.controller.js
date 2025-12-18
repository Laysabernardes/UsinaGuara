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
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const auth_service_1 = require("../services/auth.service");
let AuthController = class AuthController extends tsoa_1.Controller {
    /**
     * Autentica um usuário e retorna um token de acesso.
     * @param body Objeto contendo as credenciais (email e password)
     */
    async login(body) {
        try {
            const result = await auth_service_1.AuthService.login(body);
            this.setStatus(200);
            return result;
        }
        catch (error) {
            this.setStatus(401);
            return { message: error.message };
        }
    }
    /**
     * Inicia o fluxo de recuperação de senha enviando um e-mail com instruções/token.
     * @param body Objeto contendo o e-mail do usuário
     */
    async requestPasswordReset(body) {
        try {
            const result = await auth_service_1.AuthService.requestPasswordReset(body.email);
            this.setStatus(200);
            return result;
        }
        catch (error) {
            this.setStatus(400);
            return { message: error.message };
        }
    }
    /**
     * Define uma nova senha para o usuário utilizando o codigo padrao
     * @param body Objeto contendo o token e a nova senha
     */
    async resetPassword(body) {
        try {
            const result = await auth_service_1.AuthService.resetPassword(body);
            this.setStatus(200);
            return result;
        }
        catch (error) {
            this.setStatus(400);
            return { message: error.message };
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)("/login"),
    (0, tsoa_1.Response)(401, "Unauthorized - Credenciais inválidas"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Post)("/request-password-reset"),
    (0, tsoa_1.Response)(404, "E-mail não encontrado"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, tsoa_1.Post)("/reset-password"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("auth"),
    (0, tsoa_1.Tags)("Authentication")
], AuthController);
//# sourceMappingURL=auth.controller.js.map