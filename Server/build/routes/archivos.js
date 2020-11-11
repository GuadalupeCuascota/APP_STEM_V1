"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ArchivosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/');
    }
}
