import { fetchRequest } from "../../../api/index";
import { typeIngridient } from "../../../types/types";
import { ActionIngredientsTypes } from "./types";

export const IngredientsActionCreators = {
  getIngredients: () => (dispatch: any) => {
    fetchRequest("/ingredients")
      .then((response) => {
        const { data, success } = response;
        if (success && data) {
          dispatch({
            type: ActionIngredientsTypes.INGREDIENTS_FETCH,
            payload: data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: ActionIngredientsTypes.INGREDIENTS_ERROR,
          payload: true,
        });
      });
  },
  setIngredientSelected: (ingredient: typeIngridient) => ({
    type: ActionIngredientsTypes.INGREDIENTS_SELECTED,
    payload: ingredient,
  }),
};
