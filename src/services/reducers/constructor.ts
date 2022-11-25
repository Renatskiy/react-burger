import {
  ActionConstructorTypes,
  ConstructorAction,
} from "../actions/constructor/types";

import { sortArray } from "../../helpers";
import { ConstructorState } from "../../types/types";
const initialState: ConstructorState = {
  burgerConstructor: {
    bun: [],
    ingredients: [],
  },
  totalPrice: 0,
};

export default function burgerReducer(
  state = initialState,
  action: ConstructorAction
) {
  switch (action.type) {
    case ActionConstructorTypes.SET_BUN:
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          bun: [...state.burgerConstructor.bun, action.payload],
        },
      };
    case ActionConstructorTypes.SET_INGREDIENT:
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          ingredients: [...state.burgerConstructor.ingredients, action.payload],
        },
      };
    case ActionConstructorTypes.SORT_INGREDIENT:
      const { index, atIndex } = action.payload;
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          ingredients: sortArray(
            [...state.burgerConstructor.ingredients],
            index,
            atIndex
          ),
        },
      };
    case ActionConstructorTypes.SET_PRICE:
      return { ...state, totalPrice: action.payload };
    case ActionConstructorTypes.CLEAR_CONSTRUCTOR:
      return {
        ...state,
        burgerConstructor: {
          bun: [],
          ingredients: [],
        },
      };
    case ActionConstructorTypes.REMOVE_BUN:
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          bun: [],
        },
      };
    case ActionConstructorTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          ingredients: state.burgerConstructor.ingredients.filter(
            (x, idx) => idx !== action.payload
          ),
        },
      };
    default:
      return state;
  }
}
