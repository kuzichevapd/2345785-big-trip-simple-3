import { generateTripEvents } from './trip-event.js';

export default class TripModel {
  #tripEvents = generateTripEvents(3);

  get tripEvents() {
    return this.#tripEvents;
  }
}
