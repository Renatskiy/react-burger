import React, { useState } from "react";
import PropTypes, { func } from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { typeIngridient } from "../../types/types";
import styles from "./BurgerIngredient.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

BurgerIngredient.propTypes = {
  ingredient: typeIngridient.isRequired,
};
export default function BurgerIngredient({ ingredient }) {
  const [show, setShow] = useState(false);

  const activeModal = (e) => {
    setShow(true);
  };
  return (
    <>
      <div className={`${styles.burger_item} mb-8`} onClick={activeModal}>
        <div className="pl-4 pr-4">
          {ingredient.count > 0 && (
            <Counter
              count={ingredient.count}
              size="default"
              extraClass="burderCount"
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
      <Modal show={show} onClose={() => setShow(false)}>
        <IngredientDetails item={ingredient} />
      </Modal>
    </>
  );
}
