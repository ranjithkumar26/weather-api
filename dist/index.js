"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const weather_controller_1 = __importDefault(require("./resources/weather/weather.controller"));
const app_1 = __importDefault(require("./app"));
const app = new app_1.default([new weather_controller_1.default()], Number(process.env.PORT));
app.listen();
