"use strict";

const cities = require("../../../resources/Cities");

const UtilsService = use("App/Services/UtilsService");

class CityController {
  async index({ request }) {
    const { state_id, q } = request.all();

    let filteredCities = cities.filter((city) => city.state_id === +state_id);

    if (q) {
      filteredCities = filteredCities.filter((city) => {
        const sanatizedCity = UtilsService.sanatizeString(city.name);
        const sanatizedQuery = UtilsService.sanatizeString(q);

        if (sanatizedCity.includes(sanatizedQuery)) return city;
      });
    }

    return { data: filteredCities };
  }
}

module.exports = CityController;
