import TripPresenter from './presenter/presenter.js';
import { render } from './framework/render.js';
import FiltersView from './view/filters-form.js';
import TripModel from './model/trip-model.js';

const tripFiltersBlock = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();
const tripModel = new TripModel();

render(new FiltersView(), tripFiltersBlock);
tripPresenter.init(tripEventsSection, tripModel);
