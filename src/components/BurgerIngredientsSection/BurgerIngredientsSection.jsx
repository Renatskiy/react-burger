import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredientsSection.module.css";
import { typeIngridient } from "../../types/types";
export default class BurgerIngredientsSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, ingredients, id } = this.props;
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
}
BurgerIngredientsSection.propTypes = {
  ingredients: PropTypes.arrayOf(typeIngridient).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
