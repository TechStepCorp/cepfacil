"use strict";

const axios = require("axios");

class ViaCepService {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://viacep.com.br/ws/",
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
