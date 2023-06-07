import {render, replace, remove} from '../framework/render';
import EventsListView from '../view/events-list-form';
import EditFormView from '../view/edit-form';
import {isDatesEqual, isEsc} from '../utils/util';
import {UPDATE_TYPE, USER_ACTION} from '../const-data';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class WaypointPresenter {
  #handleModeChange = null;
  #waypointList = null;
  #editFormComponent = null;
  #waypointComponent = null;
  #waypoint = null;
  #mode = Mode.DEFAULT;
  #offers = [];
  #destinations = [];
  #handleDataChange = null;

  constructor({waypointList, onModeChange, offers, destinations, onDataChange}) {
    this.#waypointList = waypointList;
    this.#handleModeChange = onModeChange;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  init(waypoint, destinations, offers) {
    this.#waypoint = waypoint;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#waypointComponent = new EventsListView({
      oneWaypoint: this.#waypoint,
      onClick: this.#handleEditClick,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    this.#editFormComponent = new EditFormView({
      oneWaypoint: waypoint,
      onSubmit: this.#handleFormSubmit,
      offers: this.#offers,
      destinations: this.#destinations,
      onRollUpButton: this.#handleButtonClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevWaypointComponent === null || prevEditFormComponent === null) {
      render(this.#waypointComponent, this.#waypointList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointComponent, prevEditFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEditFormComponent);
    remove(prevWaypointComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#editFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceFormToPoint();
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#waypointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormComponent.shake(resetFormState);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  #replacePointToForm = () => {
    replace(this.#editFormComponent, this.#waypointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#waypointComponent, this.#editFormComponent);
    this.#mode = Mode.DEFAULT;
  };

  #ecsKeydown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#ecsKeydown);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.body.addEventListener('keydown', this.#ecsKeydown);
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#waypoint.dateFrom, update.dateFrom) || this.#waypoint.basePrice !== update.basePrice;
    this.#handleDataChange(
      USER_ACTION.UPDATE_WAYPOINT,
      isMinorUpdate ? UPDATE_TYPE.MINOR : UPDATE_TYPE.PATCH,
      update,
    );
    document.body.removeEventListener('keydown', this.#ecsKeydown);
  };

  #handleButtonClick = () => {
    this.#editFormComponent.reset(this.#waypoint);
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeydown);
  };

  #handleDeleteClick = (waypoint) => {
    this.#handleDataChange(
      USER_ACTION.DELETE_WAYPOINT,
      UPDATE_TYPE.MINOR,
      waypoint,
    );
  };

}
