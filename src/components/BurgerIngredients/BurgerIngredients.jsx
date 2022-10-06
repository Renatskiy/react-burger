import React, { useState } from "react";
import PropTypes, { array } from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";
import BurgerIngredientSection from "../BurgerIngredientsSection/BurgerIngredientsSection";
import { typeIngridient } from "../../types/types";
BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(typeIngridient).isRequired,
};
export default function BurgerIngredients({items}) {

  const ingredientTypeTitles = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const [current, setCurrent] = useState("bun");
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
              active={current === type}
              onClick={setCurrent}
              value={type}
            >
              {ingredientTypeTitles[type]}
            </Tab>
          ))}
      </div>
      <div className={`${styles.burgerItems} customScroll`}>
        {typesIngredient &&
          Object.keys(typesIngredient).map((ingredient, index) => (
            <BurgerIngredientSection
              key={ingredient}
              title={ingredientTypeTitles[ingredient]}
              ingredients={typesIngredient[ingredient]}
            />
          ))}
      </div>
    </div>
  );
}

