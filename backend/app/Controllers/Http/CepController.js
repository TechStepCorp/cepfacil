"use strict";

const ViaCepService = use("App/Services/ViaCepService");

const CepTransformer = use("App/Transformers/CepTransformer");

class CepController {
  async index({ request }) {
    const { data = [] } = await ViaCepService.getCeps(request.all());

    return CepTransformer.collection(data);
  }
}

module.exports = CepController;
