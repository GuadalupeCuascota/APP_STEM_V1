"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registro_eventoController_1 = require("../controllers/registro-eventoController");
class EventosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", registro_eventoController_1.eventosController.list);
        this.router.get("/:id", registro_eventoController_1.eventosController.getOne);
        this.router.post("/", registro_eventoController_1.eventosController.create);
        this.router.delete("/:id", registro_eventoController_1.eventosController.delete);
        this.router.put("/:id", registro_eventoController_1.eventosController.update);
    }
}
const eventoRoutes = new EventosRoutes();
exports.default = eventoRoutes.router;
