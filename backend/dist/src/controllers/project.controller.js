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
exports.ProjectController = void 0;
const tsoa_1 = require("tsoa");
const project_service_1 = require("../services/project.service");
let ProjectController = class ProjectController extends tsoa_1.Controller {
    /**
     * Cria um novo projeto.
     * @summary Cria um novo projeto.
     * @param body Dados para a criação do novo projeto.
     */
    async createProject(body) {
        try {
            const project = await project_service_1.ProjectService.create(body);
            this.setStatus(201);
            return project;
        }
        catch (error) {
            this.setStatus(409);
            return { message: error.message };
        }
    }
    /**
     * Retorna uma lista de todos os projetos, com paginação.
     * @summary Retorna todos os projetos (paginado).
     * @param page O número da página desejada (padrão 1).
     * @param limit O número de itens por página (padrão 9).
     */
    async getAllProjects(page = 1, limit = 6) {
        return await project_service_1.ProjectService.findPaginated(page, limit);
    }
    /**
     * Filtra projetos por um status específico.
     * @summary Filtra projetos por status.
     * @param status O status para filtrar. Valores aceitos: 'draft' ou 'published'.
     */
    async getProjectsByStatus(status) {
        return await project_service_1.ProjectService.findByStatus(status);
    }
    /**
     * Retorna todos os projetos que fazem parte do carrossel.
     * @summary Retorna itens do carrossel (sem ordem).
     */
    async getCarouselItems() {
        return await project_service_1.ProjectService.findCarouselItems();
    }
    /**
     * Retorna todos os projetos do carrossel, em ordem crescente.
     * @summary Retorna itens do carrossel (ordenados).
     */
    async getCarouselItemsSorted() {
        return await project_service_1.ProjectService.findCarouselItemsSorted();
    }
    /**
     * Busca projetos que possuem um banner definido.
     * @summary Busca projetos com banner.
     */
    async getProjectsWithBanner() {
        return await project_service_1.ProjectService.findWithBanner();
    }
    /**
     * Busca projetos que possuem uma URL extra definida no carrossel.
     * @summary Busca projetos com URL extra.
     */
    async getProjectsWithExtraUrl() {
        return await project_service_1.ProjectService.findWithExtraUrl();
    }
    /**
     * Busca um projeto único pelo seu slug.
     * @summary Busca um projeto por slug.
     * @param slug O slug único do projeto a ser recuperado.
     */
    async getProjectBySlug(slug) {
        const project = await project_service_1.ProjectService.findBySlug(slug);
        if (!project) {
            this.setStatus(404);
            return { message: "Project not found" };
        }
        return project;
    }
    /**
     * Filtra projetos por uma categoria específica e retorna uma lista paginada.
     * @summary Filtra projetos por categoria (paginado).
     * @param category A categoria para filtrar.
     * @param page O número da página desejada (padrão 1).
     * @param limit O número de itens por página (padrão 9).
     */
    async getProjectsByCategory(category, page = 1, limit = 6) {
        const result = await project_service_1.ProjectService.findByCategory(category, page, limit);
        return result;
    }
    /**
     * Atualiza os dados de um projeto existente.
     * @summary Atualiza um projeto.
     * @param id O ID do projeto a ser atualizado.
     * @param body Dados parciais do projeto para atualização.
     */
    async updateProject(id, body) {
        const updatedProject = await project_service_1.ProjectService.update(id, body);
        if (!updatedProject) {
            this.setStatus(404);
            return { message: "Project not found to update" };
        }
        return updatedProject;
    }
    /**
     * Deleta um projeto permanentemente.
     * @summary Deleta um projeto.
     * @param id O ID do projeto a ser deletado.
     */
    async deleteProject(id) {
        try {
            await project_service_1.ProjectService.delete(id);
            this.setStatus(204);
        }
        catch (error) {
            this.setStatus(404);
            console.error(error);
        }
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Response)("409", "Conflict"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProjects", null);
__decorate([
    (0, tsoa_1.Get)("status/{status}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsByStatus", null);
__decorate([
    (0, tsoa_1.Get)("carousel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getCarouselItems", null);
__decorate([
    (0, tsoa_1.Get)("carousel/sorted"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getCarouselItemsSorted", null);
__decorate([
    (0, tsoa_1.Get)("with-banner"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsWithBanner", null);
__decorate([
    (0, tsoa_1.Get)("with-extra-url"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsWithExtraUrl", null);
__decorate([
    (0, tsoa_1.Get)("{slug}"),
    (0, tsoa_1.Response)("404", "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectBySlug", null);
__decorate([
    (0, tsoa_1.Get)("category/{category}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsByCategory", null);
__decorate([
    (0, tsoa_1.Patch)("{id}"),
    (0, tsoa_1.Response)("404", "Not Found"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    (0, tsoa_1.SuccessResponse)("204", "No Content"),
    (0, tsoa_1.Response)("404", "Not Found"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
exports.ProjectController = ProjectController = __decorate([
    (0, tsoa_1.Route)("projects"),
    (0, tsoa_1.Tags)("Projects")
], ProjectController);
//# sourceMappingURL=project.controller.js.map