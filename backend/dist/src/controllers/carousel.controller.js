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
exports.CarouselController = void 0;
const tsoa_1 = require("tsoa");
const carousel_service_1 = require("../services/carousel.service");
let CarouselController = class CarouselController extends tsoa_1.Controller {
    /**
     * Obtém itens do carrossel com suporte a paginação.
     * Útil para listagens longas no painel administrativo.
     * * @param page Página atual (padrão: 1)
     * @param limit Itens por página (padrão: 10)
     * @summary Lista paginada do carrossel
     */
    async getAllCarouselOrder(page, limit) {
        return carousel_service_1.CarouselService.getAllCarouselOrder(page ?? 1, limit ?? 10);
    }
    /**
     * Retorna apenas os itens ativos e ordenados para exibição no site (formato flat).
     * @summary Lista simplificada para o frontend público
     */
    async getAllCarouselFlat() {
        return carousel_service_1.CarouselService.getAllCarouselFlat();
    }
    /**
     * Recupera itens que estão marcados como inativos ou ocultos.
     */
    async getAllInactiveCarouselItems() {
        return await carousel_service_1.CarouselService.getAllInactiveCarouselItems();
    }
    /**
     * Retorna todos os itens que podem ser adicionados ao carrossel (Candidatos).
     * Geralmente usado em seletores de busca no admin.
     */
    async getAllCarouselCandidates() {
        return await carousel_service_1.CarouselService.getAllCarouselCandidates();
    }
};
exports.CarouselController = CarouselController;
__decorate([
    (0, tsoa_1.Get)("/page"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "getAllCarouselOrder", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "getAllCarouselFlat", null);
__decorate([
    (0, tsoa_1.Get)("/inactive"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "getAllInactiveCarouselItems", null);
__decorate([
    (0, tsoa_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "getAllCarouselCandidates", null);
exports.CarouselController = CarouselController = __decorate([
    (0, tsoa_1.Route)("carousel"),
    (0, tsoa_1.Tags)("Carousel"),
    (0, tsoa_1.Security)("jwt")
], CarouselController);
//# sourceMappingURL=carousel.controller.js.map