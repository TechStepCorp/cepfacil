"use strict";

const ViaCepService = use("App/Services/ViaCepService");

class CepController {
  async index({ request }) {
    const { data } = await ViaCepService.getCeps(request.all());

    return data;
  }
}

module.exports = CepController;
