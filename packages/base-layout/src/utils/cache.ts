import { LAYOUT_STATE_KEY } from '../constants';

export const getConfigLayout = () => {
  const json = localStorage.getItem(LAYOUT_STATE_KEY);
  return json ? (JSON.parse(json) as LayoutSettings) : null;
};
export const setConfigLayout = (settings: LayoutSettings) => {
  localStorage.setItem(LAYOUT_STATE_KEY, JSON.stringify(settings));
};
export const removeConfigLayout = () => {
  localStorage.removeItem(LAYOUT_STATE_KEY);
};
