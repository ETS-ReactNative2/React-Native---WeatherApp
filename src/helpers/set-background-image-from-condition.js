export const setBackgroundImageFromCondition = (condition) => {
  switch (condition) {
    case "Thunderstorm":
      return require("../../assets/rainy.jpg");
    case "Drizzle":
      return require("../../assets/rainy.jpg");
    case "Rain":
      return require("../../assets/rainy.jpg");
    case "Snow":
      return require("../../assets/cloudy.jpeg");
    case "Atmosphere":
      return require("../../assets/sunny.jpg");
    case "Clear":
      return require("../../assets/sunny.jpg");
    case "Clouds":
      return require("../../assets/cloudy.jpeg");
    default:
      return require("../../assets/sunny.jpg");
  }
};
