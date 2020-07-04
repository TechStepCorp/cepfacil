"use strict";

const axios = require("axios");

const Env = use("Env");

class ViaCepService {
  constructor() {
    this.instance = axios.create({
      baseURL: Env.get("VIA_CEP_URL"),
    });
  }

  async getCeps({ initials, city, street }) {
    return await this.instance
      .get(`${initials}/${city}/${street}/json`)
      .catch((err) => console.log(err));
  }
}

const service = new ViaCepService();

module.exports = service;
