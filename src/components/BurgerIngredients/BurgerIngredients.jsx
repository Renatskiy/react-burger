import React, { useState } from "react";
import PropTypes, { array } from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsSection from "../BurgerIngredientsSection/BurgerIngredientsSection";
import { typeIngridient } from "../../types/types";

export default class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'bun',
    };
  }
  render(){
    const {items} = this.props
    const ingredientTypeTitles = {
      bun: "Булки",
      sauce: "Соусы",
      main: "Начинки",
    };

    const setCurrent = (val) => {
      this.setState({current: val})
    }

    const sortItems = items.sort((a, b) => {
      if (a.type === "bun" && b.type !== "bun") {
        return -1;
      } else if (a.type === "sauce" && b.type !== "sauce") {
        return -1;
      }
    });
    const typesIngredient = sortItems.reduce((acc, val) => {
      // !acc[val.type]?acc[val.type]=[]:acc[val.type].push(val)
      if(!acc[val.type]){
        acc[val.type] = []
      }
      acc[val.type].push(val)
      return acc
    },{})
    return (
      <div className="col">
        <div className="flex">
          {ingredientTypeTitles &&
            Object.keys(ingredientTypeTitles).map((type) => (
              <Tab
                key={type}
                onClick={setCurrent}
                active={this.state.current === type}
                value={type}
              >
                {ingredientTypeTitles[type]}
              </Tab>
            ))}
        </div>
        <div className={`${styles.items} customScroll`}>
          {typesIngredient &&
            Object.keys(typesIngredient).map((ingredient, index) =>( 
              <BurgerIngredientsSection
                key={`${ingredient}${index}`}
                title={ingredientTypeTitles[ingredient]}
                ingredients={typesIngredient[ingredient]}
              />))
          }
        </div>
      </div>
    );
  }
}
BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(typeIngridient).isRequired,
};


