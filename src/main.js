import Filters from './view/filters-form.js';
import Presenter from './presenter/presenter.js';
import ModelWaypoint from './model/waypoints-model.js';
import {mockInit, waypoints} from './mock/points-creation.js';
import {render} from './framework/render.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

mockInit(3, 10);
const modelWaypoints = new ModelWaypoint(waypoints);
const presenter = new Presenter({boardContainer: container, waypointsModel: modelWaypoints});
render(new Filters(), siteHeaderElement);
presenter.init();

