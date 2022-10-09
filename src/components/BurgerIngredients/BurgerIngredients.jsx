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

  const bunArray = items.filter((item) => item.type === "bun");
  const mainArray = items.filter((item) => item.type === "main");
  const sauceArray = items.filter((item) => item.type === "sauce");

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
        {bunArray && (
          <BurgerIngredientsSection
            id="bun"
            title="Булки"
            ingredients={bunArray}
          />
        )}
        {mainArray && (
          <BurgerIngredientsSection
            id="main"
            title="Булки"
            ingredients={mainArray}
          />
        )}
        {sauceArray && (
          <BurgerIngredientsSection
            id="sauce"
            title="Булки"
            ingredients={sauceArray}
          />
        )}
      </div>
    </div>
  );
}
