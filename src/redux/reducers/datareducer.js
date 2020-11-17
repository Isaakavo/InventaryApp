import {
  ITEM_ADDED,
  LOADING_DATA,
  SET_DATA,
  CHANGE_DATABASE,
  SET_LASTNUM,
  SET_ALL_DATA,
} from '../types';

const initialState = {
  data: [],
  allData: [],
  loading: false,
  empresa: 'espectro',
  ultimoId: 0,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ITEM_ADDED:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case CHANGE_DATABASE:
      return {
        ...state,
        empresa: action.payload,
      };
    case SET_LASTNUM:
      return {
        ...state,
        ultimoId: action.payload,
      };
    case SET_ALL_DATA:
      return {
        ...state,
        allData: action.payload,
      };
    default:
      return state;
  }
}
