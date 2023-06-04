import Observable from '../framework/observable.js';

export default class ModelDestinations extends Observable {
  #destinations = null;

  constructor(destinations) {
    super();
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
