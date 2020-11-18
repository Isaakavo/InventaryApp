import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';
const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notificatios: [],
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
      };

    default:
      return state;
  }
}
