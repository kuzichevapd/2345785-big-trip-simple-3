import dayjs from 'dayjs';
import {SORT_TYPE} from '../const-data';

const offOptions = ['event', 'offer'];
const isSelectedOption = (sortType) => (offOptions.includes(sortType) ? 'disabled' : '');

const sorts = {
  [SORT_TYPE.DAY]: undefined,
  [SORT_TYPE.EVENT]: undefined,
  [SORT_TYPE.OFFER]: undefined,
  [SORT_TYPE.PRICE]: (point1, point2) => point2.basePrice - point1.basePrice,
  [SORT_TYPE.TIME]: (point1, point2) => dayjs(point1.dateFrom).diff(dayjs(point2.dateFrom)),
};

export {isSelectedOption, sorts};
