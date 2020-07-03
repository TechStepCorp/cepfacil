"use strict";

class City {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      state_id: "required",
    };
  }

  get messages() {
    return {
      "state_id.required": "O id do estado é obrigatório.",
    };
  }
}

module.exports = City;
