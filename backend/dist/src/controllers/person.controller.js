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
exports.PersonController = void 0;
const tsoa_1 = require("tsoa");
const person_service_1 = require("../services/person.service");
let PersonController = class PersonController extends tsoa_1.Controller {
    /**
     * Registra uma nova pessoa no sistema.
     * Requer autenticação JWT.
     * @param body Dados da pessoa (validados via Zod)
     */
    async createPerson(body) {
        const person = await person_service_1.PersonService.create(body);
        this.setStatus(201);
        return person;
    }
    /**
     * Recupera uma lista de pessoas.
     * @param kind Filtro opcional para categorizar o tipo de pessoa (ex: 'colaborador', 'cliente')
     */
    async findPeople(kind) {
        return await person_service_1.PersonService.findAll(kind);
    }
    /**
       * Busca os detalhes de uma pessoa específica pelo ID único.
       * @param id Identificador UUID ou ID do banco de dados
       */
    async getPersonById(id) {
        const person = await person_service_1.PersonService.findById(id);
        if (!person) {
            this.setStatus(404);
            return { message: "Pessoa não encontrada" };
        }
        return person;
    }
    /**
     * Atualiza os dados de uma pessoa existente.
     * Requer autenticação JWT.
     * @param id ID da pessoa a ser editada
     */
    async updatePerson(id, body) {
        const updatedPerson = await person_service_1.PersonService.update(id, body);
        if (!updatedPerson) {
            this.setStatus(404);
            return { message: "Pessoa não encontrada para atualizar" };
        }
        return updatedPerson;
    }
    /**
     * Remove permanentemente uma pessoa do registro.
     * Requer autenticação JWT.
     * @param id ID da pessoa a ser excluída
     */
    async deletePerson(id) {
        try {
            await person_service_1.PersonService.delete(id);
            this.setStatus(204);
        }
        catch (error) {
            this.setStatus(404);
            throw error;
        }
    }
};
exports.PersonController = PersonController;
__decorate([
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "createPerson", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "findPeople", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    (0, tsoa_1.Response)("404", "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "getPersonById", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    (0, tsoa_1.Response)("404", "Not Found"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "updatePerson", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    (0, tsoa_1.SuccessResponse)("204", "No Content"),
    (0, tsoa_1.Response)("404", "Not Found"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "deletePerson", null);
exports.PersonController = PersonController = __decorate([
    (0, tsoa_1.Route)("people"),
    (0, tsoa_1.Tags)("People")
], PersonController);
//# sourceMappingURL=person.controller.js.map