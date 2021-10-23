export const ConvertMeterPerSecondsToKilometerPerHours = (value) => {
  const convertedValue = ((value * (60 * 60)) / 1000).toFixed(2);
  return convertedValue;
};
