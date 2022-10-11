import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredientsSection.module.css";
import { typeIngridient } from "../../types/types";

BurgerIngredientsSection.propTypes = {
  ingredients: PropTypes.arrayOf(typeIngridient).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default function BurgerIngredientsSection({ title, ingredients, id }) {
  return (
    <div className={`${styles.ingredient_block} mt-10`} id={id}>
      <div className="title text text_type_main-medium mb-6">{title}</div>
      {ingredients &&
        ingredients.map((ingredient, idx) => (
          <BurgerIngredient
            key={`${ingredient.id}_${idx}`}
            ingredient={ingredient}
          />
        ))}
    </div>
  );
}
