"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = require("../controllers/rolesController");
const jwt_1 = require("../midleware/jwt");
class RolesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', [jwt_1.checkjwt], rolesController_1.rolesController.list);
        this.router.get('/:id', rolesController_1.rolesController.getOne);
        this.router.post('/', rolesController_1.rolesController.create);
        this.router.delete('/:id', rolesController_1.rolesController.delete);
        this.router.put('/:id', rolesController_1.rolesController.update);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
