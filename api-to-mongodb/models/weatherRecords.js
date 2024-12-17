const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  City: String,
  Time: String,
  temperature: Number,
  airQuality: {
    o2: Number,
    n2: Number,
    co2: Number,
    pm1: Number,
  },
  longitude: Number,
  latitude: Number,
  rainfall: Number,
  windSpeed: Number,
  windDirection: String,
});

// Create a model from the schema
module.exports = mongoose.model("WeatherRecord", weatherSchema);
