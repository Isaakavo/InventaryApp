import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER_DATA,
} from '../types';
const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        credentials: {},
      };
    case SET_USER_DATA:
      return {
        ...state,
        credentials: action.payload,
      };
    default:
      return state;
  }
}
