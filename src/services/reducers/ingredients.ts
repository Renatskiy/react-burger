import { typeIngridient } from "../../types/types";
import {
  ActionIngredientsTypes,
  IngredientAction,
} from "../actions/ingredients/types";

interface IngredientS {
  ingredients: typeIngridient[];
  ingredientSelect: typeIngridient | object;
  error: boolean;
}

const initialState: IngredientS = {
  ingredients: [],
  ingredientSelect: {},
  error: false,
};

const clearIngredientsSelecteds = (arr: typeIngridient[]) => {
  arr.forEach((x) => (x.__v = 0));
  return arr;
};

export default function ingredientsReducer(
  state = initialState,
  action: IngredientAction
): IngredientS {
  switch (action.type) {
    case ActionIngredientsTypes.INGREDIENTS_FETCH:
      return { ...state, ingredients: action.payload };
    case ActionIngredientsTypes.INGREDIENTS_ERROR:
      return { ...state, error: action.payload };
    case ActionIngredientsTypes.INGREDIENTS_SELECTED:
      return { ...state, ingredientSelect: action.payload };
    case ActionIngredientsTypes.CLEAR_INGREDIENTS_SELECTEDS:
      return {
        ...state,
        ingredients: clearIngredientsSelecteds(state.ingredients),
      };
    default:
      return state;
  }
}
