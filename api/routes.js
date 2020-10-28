const router = require("express").Router();
const locationCtrl = require("./controller");


router
  .get("/",locationCtrl.getAllCountries)
  .get("/regions",locationCtrl.getAllRegionsForACountry)
  .get("/city/:country/",locationCtrl.getAllCitiesForARegion);

module.exports = router;
