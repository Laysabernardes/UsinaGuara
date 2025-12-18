"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonModel = void 0;
const mongoose_1 = require("mongoose");
/**
 * Definição do Schema do Mongoose.
 * Este objeto determina como os dados serão validados e armazenados no MongoDB.
 */
const personSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        default: []
    },
    contact: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true
});
exports.PersonModel = (0, mongoose_1.model)('Person', personSchema);
//# sourceMappingURL=person.model.js.map