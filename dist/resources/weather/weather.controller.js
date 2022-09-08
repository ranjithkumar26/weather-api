"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weather_interface_1 = require("./weather.interface");
const http_exception_1 = __importDefault(require("../../utils/exceptions/http.exception"));
const weather_service_1 = __importDefault(require("./weather.service"));
const mockData = require('../../utils/data/mock-response.json');
class WeatherController {
    constructor() {
        this.path = '/weather';
        this.router = (0, express_1.Router)();
        this.weatherService = new weather_service_1.default();
        this.getWeather = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                yield weather_interface_1.requestValidation.validateAsync(req.query);
                const { city, phoneNumber } = req.query;
                let data = yield this.weatherService.getWeatherData(city);
                let smsData;
                /* --- To Mock the Response and avoid failing API*/
                Number(process.env.USE_MOCK_RESPONSE) ? null :
                    smsData = yield this.weatherService.sendSMS(phoneNumber, (_b = (_a = data === null || data === void 0 ? void 0 : data.weatherData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.name, data === null || data === void 0 ? void 0 : data.temperature);
                const response = Number(process.env.USE_MOCK_RESPONSE) ? Object.assign({}, mockData) : {
                    "weatherInfo": (_c = data === null || data === void 0 ? void 0 : data.weatherData) === null || _c === void 0 ? void 0 : _c.data,
                    "temperature": data === null || data === void 0 ? void 0 : data.temperature,
                    "smsResult": Object.assign({}, smsData)
                };
                res.status(200).json(response);
            }
            catch (error) {
                next(new http_exception_1.default(400, error === null || error === void 0 ? void 0 : error.message));
            }
        });
        //To initialise routes
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, this.getWeather);
    }
}
exports.default = WeatherController;
