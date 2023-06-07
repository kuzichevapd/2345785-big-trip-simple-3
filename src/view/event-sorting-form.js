import AbstractView from '../framework/view/abstract-view';
import {isSelectedOption} from '../utils/sort';
import {SORT_TYPE, SORT_TYPE_DESCRIPTION} from '../const-data';

function createSortItemTemplate(sortType, currentSortType) {
  return `
  <div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType}"  ${isSelectedOption(sortType)} ${(sortType === currentSortType ? 'checked' : '')}>
    <label class="trip-sort__btn" for="${sortType}">${SORT_TYPE_DESCRIPTION[sortType]}</label>
  </div>`;
}

function createSortingTemplate(currentSortType) {
  const sortItemsTemplate = Object.keys(SORT_TYPE).map((sortType) => createSortItemTemplate(SORT_TYPE[sortType], currentSortType)).join('');
  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>`
  );
}

export default class EventSortingView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#handleSortTypeChangeFrom);
  }

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }

  #handleSortTypeChangeFrom = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.value);
  };
}
