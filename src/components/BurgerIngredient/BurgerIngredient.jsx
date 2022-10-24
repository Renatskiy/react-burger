import React from "react";
import { useDrag } from "react-dnd";
import { useActions } from "../../hooks/useActions";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { typeIngridient } from "../../types/types";
import styles from "./BurgerIngredient.module.css";

BurgerIngredient.propTypes = {
  ingredient: typeIngridient.isRequired,
};
export default function BurgerIngredient({ ingredient }) {
  const { setIngredientSelected, openModalAction } = useActions();
  const [{ opacity }, dragIngredient] = useDrag({
    type: "ingredient-card",
    item: { id: ingredient._id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const openModal = () => {
    setIngredientSelected(ingredient);
    openModalAction({ modalIsOpen: true, mode: "IngredientDetails" });
  };

  return (
    <>
      <div
        className={`${styles.burger_item} mb-8`}
        onClick={openModal}
        ref={dragIngredient}
        styles={{ opacity }}
      >
        <div className="pl-4 pr-4">
          {ingredient.__v > 0 && (
            <Counter
              count={ingredient.__v}
              size="default"
              className="burderCount"
            />
          )}
          <img src={ingredient.image} alt="" className="mb-1" />
          <div className={`${styles.burger_price} mb-1`}>
            <span className="text text_type_main-medium">
              {ingredient.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <div className="burgerTitle text text_type_main-default">
            {ingredient.name}
          </div>
        </div>
      </div>
    </>
  );
}
