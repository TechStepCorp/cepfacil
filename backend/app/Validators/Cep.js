"use strict";

class Cep {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      initials: "required",
      city: "required",
      street: "required",
    };
  }

  get messages() {
    return {
      "initials.required": "O estado é obrigatório.",
      "city.required": "A cidade é obrigatória.",
      "street.required": "A rua é obrigatória.",
    };
  }
}

module.exports = Cep;
