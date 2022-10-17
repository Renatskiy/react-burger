export const appReducer = (state, action) => {
  switch (action.type) {
    case "setIngredients":
      return { ...state, ingredients: action.payload };
    case "setIngredientSelect":
      return {
        ...state,
        ingredientSelect: action.payload,
      };
    case "setBun":
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          bun: [...state.burgerConstructor.bun, action.payload],
        },
      };
    case "setIngredient":
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          ingredients: [...state.burgerConstructor.ingredients, action.payload],
        },
      };
    case "removeIngredient":
      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          ingredients: state.burgerConstructor.ingredients.filter(
            (x, idx) => idx !== action.payload
          ),
        },
      };
    case "clearIngredientsSelecteds":
      const ingredients = state.ingredients.map((x) => ({
        ...x,
        ...(x.__v = 0),
      }));
      return {
        ...state,
        ingredients,
        burgerConstructor: {
          bun: [],
          ingredients: [],
        },
      };
    case "setOrder":
      return {
        ...state,
        orderNumber: action.payload,
      };
    case "setPrice":
      return { ...state, totalPrice: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    case "openModal":
      return {
        ...state,
        modalIsOpen: action.payload.modalIsOpen,
        modalMode: action.payload.mode,
      };
    case "closeModal":
      return { ...state, modalIsOpen: false };
    default:
      return state;
  }
};
