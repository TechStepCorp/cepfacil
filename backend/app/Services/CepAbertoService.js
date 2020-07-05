"use strict";

const axios = require("axios");

const Env = use("Env");

class CepAbertoService {
  constructor() {
    this.instance = axios.create({
      baseURL: Env.get("CEP_ABERTO_URL"),
    });
  }

  getLatLongByCep({ cep = "" }) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(`/cep?cep=${cep.replace(/\D/g, "")}`, {
          headers: {
            Authorization: `Token token=${Env.get("CEP_ABERTO_TOKEN")}`,
          },
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getCepByLatLong({ latitude = "", longitude = "" }) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(`/nearest?lat=${latitude}&lng=${longitude}`, {
          headers: {
            Authorization: `Token token=${Env.get("CEP_ABERTO_TOKEN")}`,
          },
        })
        .then(resolve)
        .catch(reject);
    });
  }
}

const service = new CepAbertoService();

module.exports = service;
