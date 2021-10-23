import moment from "moment";
import { calculateMonthFromNumber } from "./calculate-month-from-number";
import {
  calculateWeekFromNumber,
  calculateWeekFromNumberNativeOnly,
} from "./calculate-week-from-number";

export const calculateDateTimeFromUnix = async (dt, timezone) => {
  const getDateTime = await fetch(
    `https://showcase.api.linx.twenty57.net/UnixTime/fromunixtimestamp?unixtimestamp=${
      dt + timezone
    }`
  );
  const responseJson = await getDateTime.json();
  const newDate = responseJson.Datetime;

  const time = moment(newDate).format("hh:mm A");
  const date = moment(newDate).format("LL");
  const week = calculateWeekFromNumber(newDate);

  const formattedDateTime = `${time} - ${week}, ${date}`;
  return formattedDateTime;
};

export const calculateDateTimeNative = (timezone) => {
  const x = new Date();
  var UTCseconds =
    (x.getTime() + x.getTimezoneOffset() * 60 * 1000 + timezone * 1000) / 1000;

  var date = new Date(UTCseconds * 1000);
  var hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  var day = date.getDate();
  var dayOfWeek = date.getDay();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dayInWords = calculateWeekFromNumberNativeOnly(dayOfWeek);
  const monthInWords = calculateMonthFromNumber(month);

  const formattedDateTime = `${hours}:${minutes} - ${dayInWords}, ${monthInWords} ${day}, ${year}`;

  return formattedDateTime;
};
