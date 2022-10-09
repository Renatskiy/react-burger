import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsSection from "../BurgerIngredientsSection/BurgerIngredientsSection";
import { typeIngridient } from "../../types/types";

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(typeIngridient).isRequired,
};

export default function BurgerIngredients({ items }) {
  const ingredientTypeTitles = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  const [current, setCurrent] = useState("bun");

  const setTab = (val) => {
    setCurrent(val);
    const element = document.getElementById(val);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const buns = useMemo(() => items.filter((item) => item.type === 'bun'), [items]);  
  const mains = useMemo(() => items.filter((item) => item.type === 'main'), [items]);  
  const sauces = useMemo(() => items.filter((item) => item.type === 'sauce'), [items]);  


  return (
    <div className="col">
      <div className="flex">
        {ingredientTypeTitles &&
          Object.keys(ingredientTypeTitles).map((type) => (
            <Tab
              key={type}
              onClick={setTab}
              active={current === type}
              value={type}
            >
              {ingredientTypeTitles[type]}
            </Tab>
          ))}
      </div>
      <div className={`${styles.items} customScroll`}>
        {buns && (
          <BurgerIngredientsSection
            id="bun"
            title="Булки"
            ingredients={buns}
          />
        )}
        {mains && (
          <BurgerIngredientsSection
            id="main"
            title="Начинки"
            ingredients={mains}
          />
        )}
        {sauces && (
          <BurgerIngredientsSection
            id="sauce"
            title="Соусы"
            ingredients={sauces}
          />
        )}
      </div>
    </div>
  );
}
