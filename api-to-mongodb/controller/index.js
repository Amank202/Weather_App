const WeatherRecord = require('../models/weatherRecords');

exports.getTemperatureByCity = async (req, res) => {
  const { windDirection } = req.query;
    console.log(req.params, req.query);
  try {
    const weatherRecord = await WeatherRecord.findOne({ windDirection})
      console.log(weatherRecord);
      
    if (!weatherRecord) {
      return res.status(404).json({
        message: `No weather data found for the city ${windDirection}`,
      });
    }

    return res.status(200).json({
      weatherRecord
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error fetching weather data',
    });
  }
};