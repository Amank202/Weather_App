const axios = require("axios");
const mongoose = require("mongoose");

// Define your MongoDB schema
const weatherSchema = new mongoose.Schema({
  date: { type: Date },
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
const WeatherRecord = mongoose.model("WeatherRecord", weatherSchema);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Function to fetch data from the URL and save to MongoDB
const fetchAndSaveData = async () => {
  try {
    // Fetch data from the URL
    const response = await axios.get(
      "https://script.google.com/macros/s/AKfycbyAuBaaJw2CqqTNIfluhhrlDBRGEI5l1ClRYj_4_ZDZYTl7kdjsje_7ud4S-ec2LxAqEQ/exec"
    );
    const data = response.data.data;

    // Loop through the data and save each entry to MongoDB
    for (let entry of data) {
      // Ensure the city value is converted to a valid Date object
      const cityDate = new Date(entry.date);
      // console.log(entry.city, cityDate, entry.date);

      if (isNaN(cityDate)) {
        console.error("Invalid date:", entry.date); // Log invalid dates
        continue; // Skip this entry if the date is invalid
      }

      const weatherData = new WeatherRecord({
        city: cityDate,
        Time: entry.Time,
        temperature: entry["Temperature (C)"],
        airQuality: {
          o2: entry["Air Quality O2 (%)"],
          n2: entry["Air Quality N2 (%)"],
          co2: entry["Air Quality CO2 (ppm)"],
          pm1: entry["Air Quality PM1 (ug/m3)"],
        },
        longitude: entry.Longitude,
        latitude: entry.Latitude,
        rainfall: entry["Rainfall (mm)"],
        windSpeed: entry["Wind Speed (km/h)"],
        windDirection: entry["Wind Direction"],
      });

      // Save the data to MongoDB
      await weatherData.save();
    }

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error fetching or saving data:", error);
  }
};

// Connect to the database and fetch/save the data
const run = async () => {
  await connectDB();
  await fetchAndSaveData();
};

run();
