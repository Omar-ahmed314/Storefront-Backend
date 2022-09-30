"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userHandler_1 = __importDefault(require("./handlers/userHandler"));
const productHandler_1 = __importDefault(require("./handlers/productHandler"));
const orderHandler_1 = __importDefault(require("./handlers/orderHandler"));
const servicesHandler_1 = __importDefault(require("./handlers/servicesHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.status(200).send('<h1> Hello from the store front project</h1>');
});
// server routes
(0, userHandler_1.default)(app);
(0, productHandler_1.default)(app);
(0, orderHandler_1.default)(app);
(0, servicesHandler_1.default)(app);
app.use((req, res, next) => {
    res.status(404);
    res.json({
        msg: "Page not found"
    });
});
app.listen(PORT, () => {
    console.log(`Successfully connected to the port ${PORT}`);
});
exports.default = app;
