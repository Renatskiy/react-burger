import React from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
export default function Main() {
  const { setBun, setIngredient, removeBun } = useActions();
  const { ingredients } = useSelector((state) => state.ingredientsState);
  const { burgerConstructor } = useSelector((state) => state.burgerState);
  const { bun } = burgerConstructor;
  const handleDrop = (itemId) => {
    const item = ingredients.find((x) => x._id === itemId.id);
    if (item) {
      if (bun.length === 1 && item.type === "bun") {
        bun[0].__v = 0;
        removeBun();
      }
      item.__v = item.__v + 1;
      if (item.type === "bun") {
        setBun(item);
      } else {
        setIngredient(item);
      }
    }
  };
  return (
    <div className="container mb-10">
      <h1 className="text text_type_main-large mt-10 mb-5 title">
        Соберите бургер
      </h1>
      <div className="row">
        <BurgerIngredients />
        <BurgerConstructor onDropHandler={handleDrop} />
      </div>
    </div>
  );
}
