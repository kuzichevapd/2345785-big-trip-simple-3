import { isFuture, isPast } from '../utils/util';
import {FILTER_TYPE} from '../const-data';

export const filter = {
  [FILTER_TYPE.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isFuture(waypoint.dateFrom)),
  [FILTER_TYPE.EVERYTHING]: (waypoints) => waypoints,
  [FILTER_TYPE.PAST]: (waypoints) => waypoints.filter((waypoint) => isPast(waypoint.dateFrom)),
};
