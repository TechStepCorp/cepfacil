"use strict";

class Cep {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      latitude: "required",
      longitude: "required",
    };
  }

  get messages() {
    return {
      "latitude.required": "A latitude é obrigatório.",
      "longitude.required": "A longitude é obrigatória.",
    };
  }
}

module.exports = Cep;
