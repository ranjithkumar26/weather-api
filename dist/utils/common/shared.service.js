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
exports.getSMSToken = exports.getTemperature = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
//To convert Kelvin into Celcius
const getTemperature = (temperature) => __awaiter(void 0, void 0, void 0, function* () { return temperature - 273.15; });
exports.getTemperature = getTemperature;
//To fetch the token for Routee API call
const getSMSToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { data } = yield axios_1.default.post(`${process.env.ROUTEE_TOKEN_API_URL}`, new URLSearchParams({ grant_type: "client_credentials" }), {
            auth: {
                username: process.env.SMS_ID || '',
                password: process.env.SMS_KEY || ''
            },
        });
        return data.access_token;
    }
    catch (error) {
        throw new Error("Unable to Send SMS - " + ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.developerMessage));
    }
});
exports.getSMSToken = getSMSToken;
