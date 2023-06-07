export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const FILTER_TYPE_DESCRIPTION = {
  [FILTER_TYPE.EVERYTHING]: 'EVERYTHING',
  [FILTER_TYPE.PAST]: 'PAST',
  [FILTER_TYPE.FUTURE]: 'FUTURE',
};

export const SORT_TYPE_DESCRIPTION = {
  [SORT_TYPE.DAY]: 'Day',
  [SORT_TYPE.EVENT]: 'Event',
  [SORT_TYPE.TIME]: 'Time',
  [SORT_TYPE.PRICE]: 'Price',
  [SORT_TYPE.OFFER]: 'Offer'
};

export const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const USER_ACTION = {
  UPDATE_WAYPOINT: 'UPDATE_WAYPOINT',
  ADD_WAYPOINT: 'ADD_WAYPOINT',
  DELETE_WAYPOINT: 'DELETE_WAYPOINT',
};


