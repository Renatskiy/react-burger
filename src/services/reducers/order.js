import {
  ORDER_SUCCESS,
  SET_LOADER,
  ORDER_FAILURE,
} from "../actions/order/types";
const initialState = {
  orderNumber: null,
  loader: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_FAILURE:
      return {
        ...state,
        orderNumber: null,
      };
    case ORDER_SUCCESS:
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
