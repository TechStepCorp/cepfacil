"use strict";

const CepAbertoService = use("App/Services/CepAbertoService");

const CepTransformer = use("App/Transformers/CepTransformer");

class CepController {
  async index({ request }) {
    request;

    const { latitude, longitude } = request.all();
    const { data: cep } = await CepAbertoService.getCepByLatLong({
      latitude,
      longitude,
    });

    return CepTransformer.item(cep);
  }
}

module.exports = CepController;
