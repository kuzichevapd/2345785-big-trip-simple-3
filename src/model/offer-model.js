import Observable from '../framework/observable';
export default class ModelOffers extends Observable{
  #offers = [];
  #waypointsApi = null;

  constructor(waypointsApi) {
    super();
    this.#waypointsApi = waypointsApi;
    this.init();
  }

  async init() {
    try {
      this.#offers = await this.#waypointsApi.offers;
    } catch (err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }
}
