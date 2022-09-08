import axios from "axios";
import "dotenv/config";

import { getTemperature, getSMSToken } from "../../utils/common/shared.service";

class WeatherService {
  
  /**
   * Get weather details for given city
   */
  public async getWeatherData(city: string | any): Promise<any> {
    try {
      const weatherData = await axios.get(
        `${process.env.WEATHER_API_URL}?q=${city}&appid=${
          process.env.APPID
        }`
      );

      const temperature = await getTemperature(weatherData?.data?.main?.temp);

      return { temperature, weatherData };
    } catch (error: any) {
      throw new Error(
        "Unable to fetch data - " + error?.response?.data?.message
      );
    }
  }

  /**
   * Send SMS to given phone number
   */
  public async sendSMS(
    phoneNumber: number | any,
    city: string,
    temperature: number
  ): Promise<any> {
    try {
      const message = `Weather Report ==> city : ${city} ,temperature :  ${temperature} C`;
      const smsInfo = {
        body: message,
        to: phoneNumber,
        from: "amdTelecom",
      };

      const smsToken = await getSMSToken();
      const headers = {
        authorization: `Bearer ${smsToken}`,
        "content-type": "application/json",
      };

      const { data } = await axios.post(
        `${process.env.ROUTEE_SMS_API_URL}`,
        smsInfo,
        { headers }
      );
      return data;
    } catch (error: any) {
      throw new Error("Unable to Send SMS - " + error?.response?.data?.developerMessage);
    }
  }
}

export default WeatherService;
