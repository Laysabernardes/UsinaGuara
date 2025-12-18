"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const user_controller_1 = require("./../src/controllers/user.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const project_controller_1 = require("./../src/controllers/project.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const perspective_controller_1 = require("./../src/controllers/perspective.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const person_controller_1 = require("./../src/controllers/person.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const carousel_controller_1 = require("./../src/controllers/carousel.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./../src/controllers/auth.controller");
const auth_middleware_1 = require("./../src/middleware/auth.middleware");
const expressAuthenticationRecasted = auth_middleware_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UserResponseType": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "role": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["admin"] }, { "dataType": "enum", "enums": ["editor"] }], "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "role": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["admin"] }, { "dataType": "enum", "enums": ["editor"] }] }, "password": { "dataType": "string" }, "email": { "dataType": "string" }, "name": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "role": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["admin"] }, { "dataType": "enum", "enums": ["editor"] }] }, "email": { "dataType": "string" }, "name": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PersonResponseType": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "kind": { "dataType": "string", "required": true },
            "description": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "contact": { "dataType": "string" },
            "imageUrl": { "dataType": "string" },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectResponseType": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "title": { "dataType": "string", "required": true },
            "subtitle": { "dataType": "string", "required": true },
            "slug": { "dataType": "string", "required": true },
            "category": { "dataType": "string", "required": true },
            "year": { "dataType": "double", "required": true },
            "about_html": { "dataType": "string", "required": true },
            "team": { "dataType": "array", "array": { "dataType": "refObject", "ref": "PersonResponseType" }, "required": true },
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["draft"] }, { "dataType": "enum", "enums": ["published"] }], "required": true },
            "isCarousel": { "dataType": "boolean" },
            "orderCarousel": { "dataType": "double" },
            "banner": { "dataType": "string" },
            "extraURL": { "dataType": "string" },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateProjectInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "extraURL": { "dataType": "string" }, "banner": { "dataType": "string" }, "orderCarousel": { "dataType": "double" }, "isCarousel": { "dataType": "boolean" }, "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["draft"] }, { "dataType": "enum", "enums": ["published"] }] }, "team": { "dataType": "array", "array": { "dataType": "string" } }, "about_html": { "dataType": "string" }, "year": { "dataType": "double" }, "category": { "dataType": "string" }, "slug": { "dataType": "string" }, "subtitle": { "dataType": "string" }, "title": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatedProjectsResponse": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectResponseType" }, "required": true },
            "totalPages": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateProjectInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "extraURL": { "dataType": "string" }, "banner": { "dataType": "string" }, "orderCarousel": { "dataType": "double" }, "isCarousel": { "dataType": "boolean" }, "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["draft"] }, { "dataType": "enum", "enums": ["published"] }] }, "team": { "dataType": "array", "array": { "dataType": "string" } }, "about_html": { "dataType": "string" }, "year": { "dataType": "double" }, "category": { "dataType": "string" }, "slug": { "dataType": "string" }, "subtitle": { "dataType": "string" }, "title": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProjectDTO": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "slug": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITextBlock": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["text"], "required": true },
            "content": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITitleBlock": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["title"], "required": true },
            "content": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IImageBlock": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["image"], "required": true },
            "imageUrl": { "dataType": "string", "required": true },
            "caption": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IHighlightBlock": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["highlight"], "required": true },
            "content": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IContentBlock": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "ITextBlock" }, { "ref": "ITitleBlock" }, { "ref": "IImageBlock" }, { "ref": "IHighlightBlock" }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IReferenceDTO": {
        "dataType": "refObject",
        "properties": {
            "text": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PerspectiveResponseType": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "project": { "ref": "IProjectDTO", "required": true },
            "title": { "dataType": "string", "required": true },
            "slug": { "dataType": "string", "required": true },
            "order": { "dataType": "double", "required": true },
            "contentBlocks": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "IContentBlock" }, "required": true },
            "references": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IReferenceDTO" }, "required": true },
            "authors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "PersonResponseType" }, "required": true },
            "banner": { "dataType": "string" },
            "isCarousel": { "dataType": "boolean" },
            "orderCarousel": { "dataType": "double" },
            "extraURL": { "dataType": "string" },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePerspectiveInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "authors": { "dataType": "array", "array": { "dataType": "string" } }, "references": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "text": { "dataType": "string" } } } }, "contentBlocks": { "dataType": "array", "array": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["text"] } } }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["title"] } } }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "caption": { "dataType": "string" }, "imageUrl": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["image"] } } }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["highlight"] } } }] } }, "order": { "dataType": "double" }, "projectId": { "dataType": "string" }, "extraURL": { "dataType": "string" }, "banner": { "dataType": "string" }, "orderCarousel": { "dataType": "double" }, "isCarousel": { "dataType": "boolean" }, "slug": { "dataType": "string" }, "title": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdatePerspectiveInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "authors": { "dataType": "array", "array": { "dataType": "string" } }, "references": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "text": { "dataType": "string" } } } }, "contentBlocks": { "dataType": "array", "array": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["text"] } } }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["title"] } } }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "caption": { "dataType": "string" }, "imageUrl": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["image"] } } }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string" }, "type": { "dataType": "enum", "enums": ["highlight"] } } }] } }, "order": { "dataType": "double" }, "extraURL": { "dataType": "string" }, "banner": { "dataType": "string" }, "orderCarousel": { "dataType": "double" }, "isCarousel": { "dataType": "boolean" }, "slug": { "dataType": "string" }, "title": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePersonInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "contact": { "dataType": "string" }, "description": { "dataType": "array", "array": { "dataType": "string" } }, "kind": { "dataType": "string" }, "imageUrl": { "dataType": "string" }, "name": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdatePersonInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "contact": { "dataType": "string" }, "description": { "dataType": "array", "array": { "dataType": "string" } }, "kind": { "dataType": "string" }, "imageUrl": { "dataType": "string" }, "name": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CarouselResponseType": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "title": { "dataType": "string", "required": true },
            "slug": { "dataType": "string", "required": true },
            "collection_type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["project"] }, { "dataType": "enum", "enums": ["perspective"] }], "required": true },
            "banner": { "dataType": "string" },
            "isCarousel": { "dataType": "boolean" },
            "orderCarousel": { "dataType": "double" },
            "extraURL": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationMeta": {
        "dataType": "refObject",
        "properties": {
            "page": { "dataType": "double", "required": true },
            "limit": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "totalPages": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatedCarouselResponse": {
        "dataType": "refObject",
        "properties": {
            "items": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CarouselResponseType" }, "required": true },
            "meta": { "ref": "PaginationMeta", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginResponseType": {
        "dataType": "refObject",
        "properties": {
            "user": { "ref": "UserResponseType", "required": true },
            "token": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "password": { "dataType": "string" }, "email": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestResetInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "newPassword": { "dataType": "string" }, "userId": { "dataType": "string" } }, "validators": {} },
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
    const argsUserController_createUser = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateUserInput" },
    };
    app.post('/users', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.createUser)), async function UserController_createUser(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUser, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_findUsers = {};
    app.get('/users', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.findUsers)), async function UserController_findUsers(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_findUsers, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'findUsers',
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
    const argsUserController_getUserById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.get('/users/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getUserById)), async function UserController_getUserById(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserById, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'getUserById',
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
    const argsUserController_updateUser = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateUserInput" },
    };
    app.put('/users/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.updateUser)), async function UserController_updateUser(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'updateUser',
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
    const argsUserController_deleteUser = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.delete('/users/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.deleteUser)), async function UserController_deleteUser(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProjectController_createProject = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateProjectInput" },
    };
    app.post('/projects', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.createProject)), async function ProjectController_createProject(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_createProject, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'createProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProjectController_getAllProjects = {
        page: { "default": 1, "in": "query", "name": "page", "dataType": "double" },
        limit: { "default": 6, "in": "query", "name": "limit", "dataType": "double" },
    };
    app.get('/projects', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getAllProjects)), async function ProjectController_getAllProjects(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getAllProjects, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getAllProjects',
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
    const argsProjectController_getProjectsByStatus = {
        status: { "in": "path", "name": "status", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["draft"] }, { "dataType": "enum", "enums": ["published"] }] },
    };
    app.get('/projects/status/:status', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getProjectsByStatus)), async function ProjectController_getProjectsByStatus(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectsByStatus, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getProjectsByStatus',
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
    const argsProjectController_getCarouselItems = {};
    app.get('/projects/carousel', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getCarouselItems)), async function ProjectController_getCarouselItems(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getCarouselItems, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getCarouselItems',
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
    const argsProjectController_getCarouselItemsSorted = {};
    app.get('/projects/carousel/sorted', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getCarouselItemsSorted)), async function ProjectController_getCarouselItemsSorted(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getCarouselItemsSorted, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getCarouselItemsSorted',
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
    const argsProjectController_getProjectsWithBanner = {};
    app.get('/projects/with-banner', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getProjectsWithBanner)), async function ProjectController_getProjectsWithBanner(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectsWithBanner, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getProjectsWithBanner',
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
    const argsProjectController_getProjectsWithExtraUrl = {};
    app.get('/projects/with-extra-url', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getProjectsWithExtraUrl)), async function ProjectController_getProjectsWithExtraUrl(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectsWithExtraUrl, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getProjectsWithExtraUrl',
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
    const argsProjectController_getProjectBySlug = {
        slug: { "in": "path", "name": "slug", "required": true, "dataType": "string" },
    };
    app.get('/projects/:slug', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getProjectBySlug)), async function ProjectController_getProjectBySlug(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectBySlug, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getProjectBySlug',
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
    const argsProjectController_getProjectsByCategory = {
        category: { "in": "path", "name": "category", "required": true, "dataType": "string" },
        page: { "default": 1, "in": "query", "name": "page", "dataType": "double" },
        limit: { "default": 6, "in": "query", "name": "limit", "dataType": "double" },
    };
    app.get('/projects/category/:category', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getProjectsByCategory)), async function ProjectController_getProjectsByCategory(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectsByCategory, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'getProjectsByCategory',
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
    const argsProjectController_updateProject = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateProjectInput" },
    };
    app.patch('/projects/:id', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.updateProject)), async function ProjectController_updateProject(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_updateProject, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'updateProject',
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
    const argsProjectController_deleteProject = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.delete('/projects/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.deleteProject)), async function ProjectController_deleteProject(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_deleteProject, request, response });
            const controller = new project_controller_1.ProjectController();
            await templateService.apiHandler({
                methodName: 'deleteProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsPerspectiveController_createPerspective = {
        projectId: { "in": "path", "name": "projectId", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "CreatePerspectiveInput" },
    };
    app.post('/perspectives/projects/:projectId', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController)), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController.prototype.createPerspective)), async function PerspectiveController_createPerspective(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPerspectiveController_createPerspective, request, response });
            const controller = new perspective_controller_1.PerspectiveController();
            await templateService.apiHandler({
                methodName: 'createPerspective',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsPerspectiveController_getAllPerspectives = {};
    app.get('/perspectives', ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController)), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController.prototype.getAllPerspectives)), async function PerspectiveController_getAllPerspectives(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPerspectiveController_getAllPerspectives, request, response });
            const controller = new perspective_controller_1.PerspectiveController();
            await templateService.apiHandler({
                methodName: 'getAllPerspectives',
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
    const argsPerspectiveController_getPerspectivesForProject = {
        projectId: { "in": "path", "name": "projectId", "required": true, "dataType": "string" },
    };
    app.get('/perspectives/projects/:projectId', ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController)), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController.prototype.getPerspectivesForProject)), async function PerspectiveController_getPerspectivesForProject(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPerspectiveController_getPerspectivesForProject, request, response });
            const controller = new perspective_controller_1.PerspectiveController();
            await templateService.apiHandler({
                methodName: 'getPerspectivesForProject',
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
    const argsPerspectiveController_getPerspectiveById = {
        perspectiveId: { "in": "path", "name": "perspectiveId", "required": true, "dataType": "string" },
    };
    app.get('/perspectives/:perspectiveId', ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController)), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController.prototype.getPerspectiveById)), async function PerspectiveController_getPerspectiveById(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPerspectiveController_getPerspectiveById, request, response });
            const controller = new perspective_controller_1.PerspectiveController();
            await templateService.apiHandler({
                methodName: 'getPerspectiveById',
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
    const argsPerspectiveController_getPerspectiveBySlug = {
        slug: { "in": "path", "name": "slug", "required": true, "dataType": "string" },
    };
    app.get('/perspectives/slug/:slug', ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController)), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController.prototype.getPerspectiveBySlug)), async function PerspectiveController_getPerspectiveBySlug(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPerspectiveController_getPerspectiveBySlug, request, response });
            const controller = new perspective_controller_1.PerspectiveController();
            await templateService.apiHandler({
                methodName: 'getPerspectiveBySlug',
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
    const argsPerspectiveController_updatePerspective = {
        perspectiveId: { "in": "path", "name": "perspectiveId", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdatePerspectiveInput" },
    };
    app.patch('/perspectives/:perspectiveId', ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController)), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController.prototype.updatePerspective)), async function PerspectiveController_updatePerspective(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPerspectiveController_updatePerspective, request, response });
            const controller = new perspective_controller_1.PerspectiveController();
            await templateService.apiHandler({
                methodName: 'updatePerspective',
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
    const argsPerspectiveController_deletePerspective = {
        perspectiveId: { "in": "path", "name": "perspectiveId", "required": true, "dataType": "string" },
    };
    app.delete('/perspectives/:perspectiveId', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController)), ...((0, runtime_1.fetchMiddlewares)(perspective_controller_1.PerspectiveController.prototype.deletePerspective)), async function PerspectiveController_deletePerspective(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPerspectiveController_deletePerspective, request, response });
            const controller = new perspective_controller_1.PerspectiveController();
            await templateService.apiHandler({
                methodName: 'deletePerspective',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsPersonController_createPerson = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreatePersonInput" },
    };
    app.post('/people', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController.prototype.createPerson)), async function PersonController_createPerson(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPersonController_createPerson, request, response });
            const controller = new person_controller_1.PersonController();
            await templateService.apiHandler({
                methodName: 'createPerson',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsPersonController_findPeople = {
        kind: { "in": "query", "name": "kind", "dataType": "string" },
    };
    app.get('/people', ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController.prototype.findPeople)), async function PersonController_findPeople(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPersonController_findPeople, request, response });
            const controller = new person_controller_1.PersonController();
            await templateService.apiHandler({
                methodName: 'findPeople',
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
    const argsPersonController_getPersonById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.get('/people/:id', ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController.prototype.getPersonById)), async function PersonController_getPersonById(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPersonController_getPersonById, request, response });
            const controller = new person_controller_1.PersonController();
            await templateService.apiHandler({
                methodName: 'getPersonById',
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
    const argsPersonController_updatePerson = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdatePersonInput" },
    };
    app.put('/people/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController.prototype.updatePerson)), async function PersonController_updatePerson(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPersonController_updatePerson, request, response });
            const controller = new person_controller_1.PersonController();
            await templateService.apiHandler({
                methodName: 'updatePerson',
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
    const argsPersonController_deletePerson = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.delete('/people/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(person_controller_1.PersonController.prototype.deletePerson)), async function PersonController_deletePerson(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPersonController_deletePerson, request, response });
            const controller = new person_controller_1.PersonController();
            await templateService.apiHandler({
                methodName: 'deletePerson',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCarouselController_getAllCarouselOrder = {
        page: { "in": "query", "name": "page", "dataType": "double" },
        limit: { "in": "query", "name": "limit", "dataType": "double" },
    };
    app.get('/carousel/page', ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController)), ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController.prototype.getAllCarouselOrder)), async function CarouselController_getAllCarouselOrder(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCarouselController_getAllCarouselOrder, request, response });
            const controller = new carousel_controller_1.CarouselController();
            await templateService.apiHandler({
                methodName: 'getAllCarouselOrder',
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
    const argsCarouselController_getAllCarouselFlat = {};
    app.get('/carousel', ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController)), ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController.prototype.getAllCarouselFlat)), async function CarouselController_getAllCarouselFlat(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCarouselController_getAllCarouselFlat, request, response });
            const controller = new carousel_controller_1.CarouselController();
            await templateService.apiHandler({
                methodName: 'getAllCarouselFlat',
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
    const argsCarouselController_getAllInactiveCarouselItems = {};
    app.get('/carousel/inactive', ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController)), ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController.prototype.getAllInactiveCarouselItems)), async function CarouselController_getAllInactiveCarouselItems(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCarouselController_getAllInactiveCarouselItems, request, response });
            const controller = new carousel_controller_1.CarouselController();
            await templateService.apiHandler({
                methodName: 'getAllInactiveCarouselItems',
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
    const argsCarouselController_getAllCarouselCandidates = {};
    app.get('/carousel/all', ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController)), ...((0, runtime_1.fetchMiddlewares)(carousel_controller_1.CarouselController.prototype.getAllCarouselCandidates)), async function CarouselController_getAllCarouselCandidates(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCarouselController_getAllCarouselCandidates, request, response });
            const controller = new carousel_controller_1.CarouselController();
            await templateService.apiHandler({
                methodName: 'getAllCarouselCandidates',
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
    const argsAuthController_login = {
        body: { "in": "body", "name": "body", "required": true, "ref": "LoginInput" },
    };
    app.post('/auth/login', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.login)), async function AuthController_login(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'login',
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
    const argsAuthController_requestPasswordReset = {
        body: { "in": "body", "name": "body", "required": true, "ref": "RequestResetInput" },
    };
    app.post('/auth/request-password-reset', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.requestPasswordReset)), async function AuthController_requestPasswordReset(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_requestPasswordReset, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'requestPasswordReset',
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
    const argsAuthController_resetPassword = {
        body: { "in": "body", "name": "body", "required": true, "ref": "ResetPasswordInput" },
    };
    app.post('/auth/reset-password', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.resetPassword)), async function AuthController_resetPassword(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_resetPassword, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'resetPassword',
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
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map