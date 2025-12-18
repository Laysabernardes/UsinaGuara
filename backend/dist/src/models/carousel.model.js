"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselSchema = void 0;
const mongoose_1 = require("mongoose");
// Interface que define a estrutura do documento Carousel completo
exports.carouselSchema = new mongoose_1.Schema({
    orderCarousel: { type: Number, required: true, default: 0 },
    extraURL: { type: String, required: false },
}, {
    _id: false, // para não criar um _id para o sub-objeto
});
//# sourceMappingURL=carousel.model.js.map