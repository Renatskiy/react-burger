import { SUCCESS, SET_LOADER, FAILURE } from "../actions/order/types";
const initialState = {
  orderNumber: 0,
  loader: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case FAILURE:
      return {
        ...state,
        orderNumber: 0,
      };
    case SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
      };
    case SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
}
