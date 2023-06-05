import dayjs from 'dayjs';
import {FilterType} from './const-data';

const EVENT_DATE_FORMAT = 'MMM D';
const EVENT_TIME_FORMAT = 'H:mm';
const EVENT_YEARS_FORMAT = 'DD/MM/YY HH:mm';

export const isEsc = (evt) => evt.key === 'Escape';

export const getItemFromItemsById = (items, id) => (items.find((item) => item.id === id));

export const getDateWithoutT = (dateStr) => dateStr.substring(0, dateStr.indexOf('T'));

export const getDateDayAndMo = (dateStr) => dayjs(dateStr).format(EVENT_DATE_FORMAT);

export const getDateWithT = (dateStr) => dateStr.substring(0, dateStr.lastIndexOf(':'));

export const getTime = (dateStr) => dayjs(dateStr).format(EVENT_TIME_FORMAT);

export const getDateYears = (date) => dayjs(date).format(EVENT_YEARS_FORMAT);

export const makeFirstLetterUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const isFuture = (date) => date && dayjs().isBefore(date, 'D');

export const isPast = (date) => date && dayjs().isAfter(date, 'D');

export const filter = {
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isFuture(waypoint.dateFrom)),
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPast(waypoint.dateFrom)),
};

export const isDatesEqual = (date1, date2) => (!date1 && !date2) || dayjs(date1).isSame(date2, 'D');
