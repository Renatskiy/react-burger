import React, { useState, useMemo, useContext } from "react";
import { AppContext } from "../../services/appContext";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsSection from "../BurgerIngredientsSection/BurgerIngredientsSection";

export default function BurgerIngredients({ items }) {
  
  const { state } = useContext(AppContext);
  const { ingredients } = state;
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

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

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
          <BurgerIngredientsSection id="bun" title="Булки" ingredients={buns} />
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
