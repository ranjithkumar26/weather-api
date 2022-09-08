import 'dotenv/config';

import WeatherController from './resources/weather/weather.controller';
import  App from './app'

const app = new App([new WeatherController()], Number(process.env.PORT))

app.listen()