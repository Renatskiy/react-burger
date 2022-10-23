import {
  SET_BUN,
  SET_INGREDIENT,
  SET_PRICE,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  REMOVE_BUN,
  SORT_INGREDIENT,
} from "../actions/constructor/types";

import { sortArray } from "../../helpers";
const initialState = {
  burgerConstructor: {
    bun: [],
    ingredients: [],
  },
  totalPrice: 0,
};

export default function burgerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          bun: [...state.burgerConstructor.bun, action.payload],
        },
      };
    case SET_INGREDIENT:
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          ingredients: [...state.burgerConstructor.ingredients, action.payload],
        },
      };
    case SORT_INGREDIENT:
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
    case SET_PRICE:
      return { ...state, totalPrice: action.payload };
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        burgerConstructor: {
          bun: [],
          ingredients: [],
        },
      };
    case REMOVE_BUN:
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          bun: [],
        },
      };
    case REMOVE_INGREDIENT:
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