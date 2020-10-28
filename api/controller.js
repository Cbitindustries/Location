const axios = require("axios");
const db = require("./src/models");

exports.getAllCountries = async (req, res) => {
  try {
    let countryList = await db.country.findAll();

    if (countryList.length === 0) {
      url = `http://battuta.medunes.net/api/country/all/?key=${process.env.LOCATION_KEY}`;
      data = await axios.get(url)
      countryList = await db.country.bulkCreate(data.data)
    }

    return res
      .status(200)
      .json({ success: true, message: "Success", data: countryList });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllRegionsForACountry = async (req, res) => {
  try {
    const { country } = req.query;

    const regions = await db.region.findAll({ where: { country } });

    if (regions.length === 0) {
      const data = await axios.get(
        `http://battuta.medunes.net/api/region/${country}/all/?key=${process.env.LOCATION_KEY}`
      );

      if (data.data.length === 0) {
        return res
          .status(200)
          .json({ success: true, message: "No regions for country", data: [] });
      }

      const regionList = await db.region.bulkCreate(data.data);

      return res
        .status(200)
        .json({ success: true, message: "Success", data: regionList });
    }

    return res.status(200).json({ success: true, data: regions });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCitiesForARegion = async (req, res) => {
  try {
    const { region } = req.query;
    const { country } = req.params;
    const cities = await db.city.findAll({ where: { region, country } });

    if (cities.length === 0) {
      const cities = await axios.get(
        `http://battuta.medunes.net/api/city/${country}/search/?region=${region}&key=${process.env.LOCATION_KEY}`
      );

      if (cities.data.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No city found for region",
          data: [],
        });
      }

      const cityList = await db.city.bulkCreate(cities.data);
      return res
        .status(200)
        .json({ success: true, message: "Success", data: cityList });
    }

    return res.status(200).json({ success: true, data: cities });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
