import Filters from './view/filters-form.js';
import Presenter from './presenter/presenter.js';
import ModelWaypoint from './model/waypoints-model.js';
import {mockInit, waypoints} from './mock/points-creation.js';
import {render} from './framework/render.js';
import ModelDestinations from './model/destination-model.js';
import ModelOffers from './model/offer-model.js';
import { offersByType } from './mock/const-data.js';
import { destinations } from './mock/destination-info.js';


const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

mockInit(3, 10);

const modelWaypoints = new ModelWaypoint(waypoints);
const modelDestinations = new ModelDestinations(destinations);
const modelOffers = new ModelOffers(offersByType);

const presenter = new Presenter({
  boardContainer: container,
  waypointsModel: modelWaypoints,
  modelOffers,
  modelDestinations
});

render(new Filters(), siteHeaderElement);

presenter.init();

