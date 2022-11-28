import { ActionOrderTypes, OrderAction } from "../actions/order/types";

interface IState {
  orderNumber: number | null;
  loader: boolean;
}

const initialState: IState = {
  orderNumber: null,
  loader: false,
};

export default function orderReducer(
  state = initialState,
  action: OrderAction
) {
  switch (action.type) {
    case ActionOrderTypes.ORDER_FAILURE:
      return {
        ...state,
        orderNumber: null,
      };
    case ActionOrderTypes.ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
      };
    case ActionOrderTypes.SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
}
