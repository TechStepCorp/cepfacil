"use strict";

const CepAbertoService = use("App/Services/CepAbertoService");

class CepTransformer {
  static async collection(list = []) {
    let filredList = [];

    let latLongFlag = false;

    if (list.length > 0 && list.length < 4) latLongFlag = true;

    for (const item of list) {
      const {
        cep,
        logradouro: street,
        localidade: city,
        uf: stateInitials,
      } = item;

      let res;

      if (latLongFlag) {
        await this._timeout(1000);

        res = await CepAbertoService.getLatLongByCep({
          cep,
        }).catch((e) => console.log(e.response.status));
      }

      filredList.push({
        cep,
        street,
        city,
        stateInitials,
        latitude: res && res.data.latitude,
        longitude: res && res.data.longitude,
      });
    }

    return filredList;
  }

  static async item(item = {}) {
    const {
      cep,
      logradouro: street,
      uf: stateInitials,
      bairro: neighborhood,
      cidade: city,
      estado: state,
    } = item;

    return {
      cep,
      street,
      stateInitials,
      neighborhood,
      city,
      state,
    };
  }

  static async _timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = CepTransformer;
