import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import { useActions } from "../../hooks/useActions";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { typeIngridient } from "../../types/types";
import styles from "./BurgerIngredient.module.css";

interface Icomponent {
  ingredient: typeIngridient;
}

const BurgerIngredient: FC<Icomponent> = ({ ingredient }) => {
  const location = useLocation();
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
        className={`${styles.burgerItem} mb-8`}
        onClick={openModal}
        ref={dragIngredient}
        style={{ opacity }}
      >
        <Link
          className={styles.burgerItemlink}
          to={{
            pathname: `/ingredients/${ingredient._id}`,
            state: { background: location },
          }}
        >
          <div className="pl-4 pr-4">
            {ingredient.__v > 0 && (
              <Counter count={ingredient.__v} size="default" />
            )}

            <img src={ingredient.image} alt="" className="mb-1" />
            <div className={`${styles.burderItemPrice} mb-1`}>
              <span className="text text_type_main-medium">
                {ingredient.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <div className="burgerTitle text text_type_main-default">
              {ingredient.name}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default BurgerIngredient;
