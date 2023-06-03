import Sorting from '../view/event-sorting-form.js';
import WaypointList from '../view/events-list-form.js';
import NoWaypointMessage from '../view/empty-list.js';
import {render, RenderPosition} from '../framework/render.js';
import WaypointPresenter from './trip-points-presenter.js';
import {SortType} from '../mock/const-data.js';
import {sorts} from '../mock/sort-type.js';
import EditForm from '../view/edit-form.js';
import { changeWaypoint } from '../util.js';


export default class Presenter {
  #waypointListComponent = new WaypointList();
  #noWaypointMessage = new NoWaypointMessage();
  #sortComponent = new Sorting();
  #waypointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedWaypoints = [];
  #boardContainer = null;
  #waypointsModel = null;
  #waypoints = null;
  #offers = [];
  #destinations = [];
  #modelOfOffers = null;
  #modelOfDestinations = null;

  constructor({boardContainer, waypointsModel, modelOfOffers, modelOfDestinations}) {
    this.#boardContainer = boardContainer;
    this.#waypointsModel = waypointsModel;
    this.#modelOfOffers = modelOfOffers;
    this.#modelOfDestinations = modelOfDestinations;
  }

  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];
    this.#renderBoard();
    this.#sourcedWaypoints = [...this.#waypointsModel.waypoints];
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoWaypoint() {
    render(this.#noWaypointMessage, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypointList: this.#waypointListComponent.element,
      offers: this.#offers,
      destinations: this.#destinations,
      onDataChange: this.#handleWaypointChange,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint, this.destinations, this.offers);
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  }

  #renderWaypointsList() {
    render(this.#waypointListComponent, this.#boardContainer);
    this.#waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }

  #renderBoard() {
    if (this.#waypoints.length === 0) {
      render(this.#renderNoWaypoint, this.#boardContainer);
      return;
    }
    this.#renderSort();

    render(new EditForm({
      destinations: this.#destinations,
      offers: this.#offers,
      isEditForm: false
    }), this.#waypointListComponent.element);
    this.#renderWaypointsList();
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.#waypoints = changeWaypoint(this.#waypoints, updatedWaypoint);
    this.#waypointPresenter.get(updatedWaypoint.id).init(updatedWaypoint, this.#destinations, this.#offers);
  };

  #clearWaypointList() {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();
  }

  #sortWaypoints(sortType) {
    if (sorts[sortType]) {
      this.#waypoints.sort(sorts[sortType]);
    } else {
      this.#waypoints = [...this.#sourcedWaypoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortWaypoints(sortType);
    this.#clearWaypointList();
    this.#renderWaypointsList();
  };
}
