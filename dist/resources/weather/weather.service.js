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
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const shared_service_1 = require("../../utils/common/shared.service");
class WeatherService {
    /**
     * Get weather details for given city
     */
    getWeatherData(city) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const weatherData = yield axios_1.default.get(`${process.env.WEATHER_API_URL}?q=${city}&appid=${process.env.APPID}`);
                const temperature = yield (0, shared_service_1.getTemperature)((_b = (_a = weatherData === null || weatherData === void 0 ? void 0 : weatherData.data) === null || _a === void 0 ? void 0 : _a.main) === null || _b === void 0 ? void 0 : _b.temp);
                return { temperature, weatherData };
            }
            catch (error) {
                throw new Error("Unable to fetch data - " + ((_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message));
            }
        });
    }
    /**
     * Send SMS to given phone number
     */
    sendSMS(phoneNumber, city, temperature) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = `Weather Report ==> city : ${city} ,temperature :  ${temperature} C`;
                const smsInfo = {
                    body: message,
                    to: phoneNumber,
                    from: "amdTelecom",
                };
                const smsToken = yield (0, shared_service_1.getSMSToken)();
                const headers = {
                    authorization: `Bearer ${smsToken}`,
                    "content-type": "application/json",
                };
                const { data } = yield axios_1.default.post(`${process.env.ROUTEE_SMS_API_URL}`, smsInfo, { headers });
                return data;
            }
            catch (error) {
                throw new Error("Unable to Send SMS - " + ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.developerMessage));
            }
        });
    }
}
exports.default = WeatherService;
