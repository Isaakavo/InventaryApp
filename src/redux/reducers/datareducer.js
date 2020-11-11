import { ITEM_ADDED, LOADING_DATA, SET_DATA, CHANGE_DATABASE } from '../types';

const initialState = {
  data: [],
  loading: false,
  empresa: 'Espectro',
};

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
        data: [action.payload, ...state.data],
        loading: false,
      };
    case CHANGE_DATABASE:
      return {
        ...state,
        empresa: action.payload,
      };
    default:
      return state;
  }
}
