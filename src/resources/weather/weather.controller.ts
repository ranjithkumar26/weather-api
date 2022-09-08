import { Router, Request, Response, NextFunction } from 'express';

import { requestValidation } from './weather.interface';
import Controller from '../../utils/interface/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import WeatherService from './weather.service'
const mockData = require('../../utils/data/mock-response.json') 

class WeatherController implements Controller {
    public path = '/weather';
    public router = Router();
    public weatherService = new WeatherService();

    constructor() {
        //To initialise routes
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            this.getWeather
        )
    }

    private getWeather = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            await requestValidation.validateAsync(req.query);

            const { city, phoneNumber } = req.query;
            
            let data = await this.weatherService.getWeatherData(city);
            let smsData;

            /* --- To Mock the Response and avoid failing API*/
            Number(process.env.USE_MOCK_RESPONSE) ? null :
            smsData = await this.weatherService.sendSMS(
                phoneNumber,
                data?.weatherData?.data?.name,
                data?.temperature
            )

            const response = Number(process.env.USE_MOCK_RESPONSE) ? { ...mockData} : {
                "weatherInfo": data?.weatherData?.data,
                "temperature" : data?.temperature,
                "smsResult" : { ...smsData }
            }

            res.status(200).json(response)
        } catch (error: any) {
            next(new HttpException(400, error?.message));
        }
    }

   
}

export default WeatherController