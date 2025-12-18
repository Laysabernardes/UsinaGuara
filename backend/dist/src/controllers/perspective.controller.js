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
exports.PerspectiveController = void 0;
const tsoa_1 = require("tsoa");
const perspective_service_1 = require("../services/perspective.service");
let PerspectiveController = class PerspectiveController extends tsoa_1.Controller {
    /**
     * Cria uma nova perspectiva associada a um projeto.
     * @param projectId O ID do projeto ao qual a perspectiva pertence.
     * @param body Os dados da nova perspectiva a ser criada.
     */
    async createPerspective(projectId, body) {
        // Garante que o projectId do corpo da requisição seja o mesmo da URL, mantendo a consistência dos dados.
        const perspectiveData = { ...body, projectId };
        const perspective = await perspective_service_1.PerspectiveService.create(perspectiveData);
        this.setStatus(201);
        return perspective;
    }
    /**
     * Retorna todas as perspectivas de todos os projetos.
     */
    async getAllPerspectives() {
        return perspective_service_1.PerspectiveService.findAll();
    }
    /**
     * Retorna todas as perspectivas de um projeto específico.
     * @param projectId O ID do projeto para o qual as perspectivas serão buscadas.
     */
    async getPerspectivesForProject(projectId) {
        return perspective_service_1.PerspectiveService.findByProjectId(projectId);
    }
    /**
     * Retorna uma perspectiva específica pelo seu ID.
     * @param perspectiveId O ID da perspectiva a ser encontrada.
     */
    async getPerspectiveById(perspectiveId) {
        const perspective = await perspective_service_1.PerspectiveService.findById(perspectiveId);
        if (!perspective) {
            this.setStatus(404);
            return { message: "Perspectiva não encontrada" };
        }
        return perspective;
    }
    /**
     * Busca um projeto único pelo seu slug.
     * @summary Busca um projeto por slug.
     * @param slug O slug único do projeto a ser recuperado.
     */
    async getPerspectiveBySlug(slug) {
        const perspective = await perspective_service_1.PerspectiveService.findBySlug(slug);
        if (!perspective) {
            this.setStatus(404);
            return { message: "Perspectiva não encontrada" };
        }
        return perspective;
    }
    /**
     * Atualiza uma perspectiva existente.
     * @param perspectiveId O ID da perspectiva a ser atualizada.
     * @param body Os dados a serem atualizados na perspectiva.
     */
    async updatePerspective(perspectiveId, body) {
        const updatedPerspective = await perspective_service_1.PerspectiveService.update(perspectiveId, body);
        if (!updatedPerspective) {
            this.setStatus(404);
            return { message: "Perspectiva não encontrada para atualizar" };
        }
        return updatedPerspective;
    }
    /**
     * Deleta uma perspectiva.
     * @param perspectiveId O ID da perspectiva a ser deletada.
     */
    async deletePerspective(perspectiveId) {
        // O próprio service já lança um erro se não encontrar,
        // que será capturado por um middleware de erro.
        // Se der certo, apenas setamos o status.
        await perspective_service_1.PerspectiveService.delete(perspectiveId);
        this.setStatus(204);
        return;
    }
};
exports.PerspectiveController = PerspectiveController;
__decorate([
    (0, tsoa_1.Post)("/projects/{projectId}"),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Security)("jwt") // Indica que esta rota requer autenticação
    ,
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PerspectiveController.prototype, "createPerspective", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerspectiveController.prototype, "getAllPerspectives", null);
__decorate([
    (0, tsoa_1.Get)("/projects/{projectId}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerspectiveController.prototype, "getPerspectivesForProject", null);
__decorate([
    (0, tsoa_1.Get)("/{perspectiveId}"),
    (0, tsoa_1.Response)(404, "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerspectiveController.prototype, "getPerspectiveById", null);
__decorate([
    (0, tsoa_1.Get)("/slug/{slug}"),
    (0, tsoa_1.Response)("404", "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerspectiveController.prototype, "getPerspectiveBySlug", null);
__decorate([
    (0, tsoa_1.Patch)("/{perspectiveId}"),
    (0, tsoa_1.Response)(404, "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PerspectiveController.prototype, "updatePerspective", null);
__decorate([
    (0, tsoa_1.Delete)("/{perspectiveId}"),
    (0, tsoa_1.SuccessResponse)("204", "No Content"),
    (0, tsoa_1.Response)(404, "Not Found"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerspectiveController.prototype, "deletePerspective", null);
exports.PerspectiveController = PerspectiveController = __decorate([
    (0, tsoa_1.Tags)("Perspectives"),
    (0, tsoa_1.Route)("perspectives"),
    (0, tsoa_1.Security)("jwt")
], PerspectiveController);
//# sourceMappingURL=perspective.controller.js.map