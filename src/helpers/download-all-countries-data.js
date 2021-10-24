import { countriesData } from "../../assets/data/countriesData";
import axios from "axios";
import { calculateMonthFromNumber } from "./calculate-month-from-number";
import { calculateWeekFromNumberNativeOnly } from "./calculate-week-from-number";

//Add your API key below
const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=<ADDYOURAPIKEY>8e&units=metric&q=`;

const WeatherForecastRequest = async (city, country) => {
  try {
    const url = !country ? `${baseURL}${city}` : `${baseURL}${city},${country}`;
    const response = await axios.get(url);

    // return response.data;
    const formatted = formattedData(response.data);
    return formatted;
  } catch (err) {
    console.log("open weather api error", err);
  }
};

const formattedData = (data) => {
  const fData = {
    ...data,
    time: calculateDateTimeNative(data.dt, data.timezone),
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };

  return fData;
};

const calculateDateTimeNative = (dt, timezone) => {
  const x = new Date();
  var UTCseconds =
    (x.getTime() + x.getTimezoneOffset() * 60 * 1000 + timezone * 1000) / 1000;

  var date = new Date(UTCseconds * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var day = date.getDate();
  var dayOfWeek = date.getDay();
  // const seconds = date.getSeconds();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dayInWords = calculateWeekFromNumberNativeOnly(dayOfWeek);
  const monthInWords = calculateMonthFromNumber(month);

  const formattedDateTime = `${hours}:${minutes} - ${dayInWords}, ${monthInWords} ${day}, ${year}`;

  return formattedDateTime;
};

export const getAllWeather = (
  setProgress,
  setAllWeatherCountries,
  setVisible
) => {
  let tempResult = [];
  let i = 0;
  const timer = setInterval(async () => {
    if (i < countriesData.length) {
      console.log(i);
      const result = await WeatherForecastRequest(countriesData[i].name);
      tempResult.push(result);
      setProgress(i / countriesData.length);
      i++;
    } else {
      clearInterval(timer);
      setAllWeatherCountries(tempResult);
      setVisible(false);
    }
  }, 2000);
};
