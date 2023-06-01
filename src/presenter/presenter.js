import { render } from '../framework/render.js';
import TripEventsList from '../view/events-list.js';
import EventsSortingForm from '../view/events-sorting-form.js';
import TripEvent from '../view/trips-event.js';
import TripEventPresenter from './trip-event-presenter.js';
import { changeItem } from '../util';
class TripPresenter {
  init(container, tripModel) {
    this.container = container;
    this.tripModel = tripModel;
    this.tripEventsData = tripModel.tripEvents;
    this.tripEvents = this.tripEventsData.map((tripData) => new TripEvent(tripData));
    this.tripListComponent = new TripEventsList(this.tripEvents);
    render(new EventsSortingForm(), this.container);
    render(this.tripListComponent, this.container);
    if (this.tripEvents.length === 0){
      this.#renderEmptyList();
    }
  }

  #renderEmptyList = () => {
    this.tripListComponent.updateMessage();
  };

  #renderEvent = (task) => {
    const tripEventPresenter = new TripEventPresenter(this.tripListComponent, this.#handleEventChange, this.#handleModeChange);
    tripEventPresenter.init(task);
    this.tripEventPresenter.set(task.id, tripEventPresenter);
  };

  #clearEventList = () => {
    this.tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.tripEventPresenter.clear();
  };

  #handleEventChange = (updatedEvent) => {
    this.tripEvents = changeItem(this.tripEvents, updatedEvent);
    this.tripEventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.tripEventPresenter.forEach((presenter) => presenter.resetView());
  };
}

export default TripPresenter;
