import ModelDestinations from './model/destination-model.js';
import Presenter from './presenter/presenter.js';
import ModelWaypoint from './model/waypoint-model.js';
import ModelFilters from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {render} from './render.js';
import NewWaypointButton from './view/waypoint-button-form.js';
import ModelOffers from './model/offer-model.js';
import WaypointsApi from './api.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const placeForButton = document.querySelector('.trip-main');

const AUTHORIZATION = 'Basic sgkdajgskdgas7777';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const waypointsApi = new WaypointsApi(END_POINT, AUTHORIZATION);

const modelWaypoints = new ModelWaypoint(waypointsApi);
const modelOffers = new ModelOffers(waypointsApi);
const modelDestinations = new ModelDestinations(waypointsApi);
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

filterPresenter.init();
presenter.init();
modelWaypoints.init().finally(() => {render(newWaypointButtonComponent, placeForButton);});
