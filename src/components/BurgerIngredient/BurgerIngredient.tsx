import React from "react";
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {typeIngridient} from '../../types/types'
import styles from "./BurgerIngredient.module.css";


BurgerIngredient.propTypes = {
    ingredient: typeIngridient,
  };

export default function BurgerIngredient({ingredient}){
    return (
        <div className={`${styles.burgerItem} mb-8`}>
      <div className="pl-4 pr-4">
        {ingredient.__v > 0 && (
          <Counter
            count={ingredient.__v}
            size="default"
            extraClass="burderCount"
          />
        )}

        <img src={ingredient.image} alt="" className="mb-1" />
        <div className={`${styles.burderItemPrice} mb-1`}>
          <span className="text text_type_main-medium">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className="burgerTitle text text_type_main-default">
          {ingredient.name}
        </div>
      </div>
    </div>
    )
}