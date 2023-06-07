import Observable from '../framework/observable';

export default class DestinationModel extends Observable {
  #destinations = null;
  #waypointsApi = null;

  constructor(waypointsApi) {
    super();
    this.#waypointsApi = waypointsApi;
    this.init();
  }

  async init() {
    try {
      this.#destinations = await this.#waypointsApi.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
