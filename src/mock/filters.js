import { FilterType } from './const-data.js';
import { isTripDateBeforeToday } from '../util.js';


const filter = {
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isTripDateBeforeToday(waypoint.dateFrom)),
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
};


function generateFilter() {
  return Object.keys(filter).map((filterName) => filterName );
}


export {generateFilter};
