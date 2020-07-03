"use strict";

class UtilsService {
  static sanatizeString(string) {
    return string.normalize("NFD").toLowerCase();
  }
}

module.exports = UtilsService;
