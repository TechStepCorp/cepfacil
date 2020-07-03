"use strict";

const states = require("../../../resources/States");

const UtilsService = use("App/Services/UtilsService");

class StateController {
  async index({ request }) {
    const { q } = request.all();

    let filteredStates = states;

    if (q) {
      filteredStates = states.filter((state) => {
        const sanatizedState = UtilsService.sanatizeString(state.name);
        const sanatizedInitals = UtilsService.sanatizeString(state.initials);
        const sanatizedQuery = UtilsService.sanatizeString(q);

        if (
          sanatizedInitals.includes(sanatizedQuery) ||
          sanatizedState.includes(sanatizedQuery)
        )
          return state;
      });
    }

    return { data: filteredStates };
  }
}

module.exports = StateController;
