import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const EVENT_TIME_FORMAT = 'H:mm';
const EVENT_YEARS_FORMAT = 'DD/MM/YY HH:mm';

export const getRandomItemFromItems = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomPrice = () => Math.floor(Math.random() * 100000) + 777;

export const getRandomId = () => Math.floor(Math.random() * 100) + 1;

export const getRandomSliceFromItems = (items) => {
  const n = Math.floor(Math.random() * (items.length + 1));
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const createIDgenerator = () => {
  let id = 0;
  return () => ++id;
};

export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export const isEsc = (evt) => evt.key === 'Escape';

export const getItemFromItemsById = (items, id) => (items.find((item) => item.id === id));

export const isTripDateBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');

export const changeType = (type) => type.charAt(0).toUpperCase() + type.slice(1);

export const getDateWithoutT = (dateStr) => dateStr.substring(0, dateStr.indexOf('T'));

export const getDateDayAndMo = (dateStr) => dayjs(dateStr).format(EVENT_DATE_FORMAT);

export const getDateWithT = (dateStr) => dateStr.substring(0, dateStr.lastIndexOf(':'));

export const getTime = (dateStr) => dayjs(dateStr).format(EVENT_TIME_FORMAT);

export const getDateYears = (date) => dayjs(date).format(EVENT_YEARS_FORMAT);

export const changeWaypoint = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const makeFirstLetterUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);
