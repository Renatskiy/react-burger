export enum ActionOrderTypes {
  ORDER_SUCCESS = "ORDER_SUCCESS",
  ORDER_FAILURE = "ORDER_FAILURE",
  SET_LOADER = "SET_LOADER",
}

interface setIsLoader {
  type: ActionOrderTypes.SET_LOADER;
  payload: boolean;
}
interface setOrder {
  type: ActionOrderTypes.ORDER_SUCCESS;
  payload: number;
}
interface setOrderFailure {
  type: ActionOrderTypes.ORDER_FAILURE;
  payload: number;
}

export type OrderAction = setOrder | setIsLoader | setOrderFailure;
