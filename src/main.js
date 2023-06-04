import ModelDestinations from './model/destination-model.js';
import {offersByType} from './mock/const-data.js';
import Presenter from './presenter/presenter.js';
import ModelWaypoint from './model/waypoint-model.js';
import {mockInit, waypoints} from './mock/points-creation.js';
import ModelFilters from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {render} from './render.js';
import NewWaypointButton from './view/waypoint-button-form.js';
import ModelOffers from './model/offer-model.js';
import {destinations} from './mock/destination-info.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const placeForButton = document.querySelector('.trip-main');

mockInit(3, 10);
const modelWaypoints = new ModelWaypoint(waypoints);
const modelOffers = new ModelOffers(offersByType);
const modelDestinations = new ModelDestinations(destinations);
const modelFilter = new ModelFilters();

const presenter = new Presenter({
  boardContainer: container,
  waypointsModel: modelWaypoints,
  modelOffers,
  modelDestinations,
  modelFilter,
  onNewWaypointDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  modelFilter,
  modelWaypoints
});

const newWaypointButtonComponent = new NewWaypointButton({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskFormClose() {
  newWaypointButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  presenter.createWaypoint();
  newWaypointButtonComponent.element.disabled = true;
}

render(newWaypointButtonComponent, placeForButton);

filterPresenter.init();
presenter.init();
