import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./actions/ws/types";

import { socketMiddleware } from "../middleware/socketMiddleware";
const wsUrl = "wss://norma.nomoreparties.space/orders/all";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    // args: () => any;
  }
}
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, socketMiddleware(wsUrl))
);
