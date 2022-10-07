import React from "react";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredientsSection.module.css";
export default class BurgerIngredientSection extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const{title, ingredients} = this.props
    return (
      <div className={`${styles.ingredient_block} mt-10` }>
        <div className="title text text_type_main-medium mb-6">{title }</div>
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