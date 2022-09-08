import axios from "axios";
import 'dotenv/config'

//To convert Kelvin into Celcius
export const getTemperature = async(temperature: number) => temperature - 273.15;

//To fetch the token for Routee API call
export const getSMSToken = async () => {
  try {
  
    const { data } = await axios.post(
      `${process.env.ROUTEE_TOKEN_API_URL}`,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        auth: {
          username: process.env.SMS_ID || '',
          password: process.env.SMS_KEY || ''
        },
      }
    );
    
    return data.access_token;
  } catch (error: any) {
    throw new Error("Unable to Send SMS - " + error?.response?.data?.developerMessage);
  }
};
