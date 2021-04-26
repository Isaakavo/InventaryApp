import {
  ITEM_ADDED,
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_DATA,
  EXIT_ADDED,
  DELETE_DATA,
  CHANGE_DATABASE,
  SET_LASTNUM,
  UPDATE_DATA,
  SET_EXITS,
} from '../types';

const initialState = {
  data: [],
  exits: [],
  loading: false,
  empresa: 'salidas',
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
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SET_EXITS:
      return {
        ...state,
        exits: action.payload,
        loading: false,
      };
    case DELETE_DATA:
      state.data = state.data.filter(
        (index) => index.numero !== action.payload
      );
      state.data.forEach((elem) => {
        if (elem.numero > action.payload) {
          elem.numero -= 1;
        }
      });
      return {
        ...state,
      };
    case UPDATE_DATA:
      let index = state.data.findIndex(
        (element) => element.id === action.payload.id
      );
      state.data[index] = action.payload;
      if (state.data.id === action.payload.id) {
        state.data = action.payload;
      }
      return {
        ...state,
      };

    case ITEM_ADDED:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case EXIT_ADDED:
      return {
        ...state,
        exits: [...state.exits, action.payload],
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

    default:
      return state;
  }
}
