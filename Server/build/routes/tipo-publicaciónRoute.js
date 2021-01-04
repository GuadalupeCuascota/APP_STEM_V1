"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_publicaci_nController_1 = require("../controllers/tipo-publicaci\u00F3nController");
class TipoPublicacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", tipo_publicaci_nController_1.tipoPublicaciónController.list);
        this.router.get("/:id");
        this.router.post("/");
        this.router.delete("/:id");
        this.router.put("/:id");
    }
}
const tipoPublicacionRoutes = new TipoPublicacionRoutes();
exports.default = tipoPublicacionRoutes.router;
