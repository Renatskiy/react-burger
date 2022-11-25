import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientSection from "../BurgerIngredientSection/BurgerIngredientSection";
import { typeIngridient } from "../../types/types";

export interface ITypesIngredientObject {
  [index: string]: typeIngridient[];
}

interface ITEIngredientObject {
  bun: "Булки";
  sauce: "Соусы";
  main: "Начинки";
}

function BurgerIngredients() {
  const { ingredients } = useSelector((state: any) => state.ingredientsState);
  const ingredientTypeTitles: ITEIngredientObject = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState("bun");
  const sortItems = ingredients.sort((a: typeIngridient, b: typeIngridient) => {
    if (a.type === "bun" && b.type !== "bun") {
      return -1;
    } else if (a.type === "sauce" && b.type !== "sauce") {
      return -1;
    } else {
      return 0;
    }
  });
  const setTab = (val: string) => {
    setCurrent(val);
    const element = document.getElementById(val);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const typesIngredient: ITypesIngredientObject = {};

  sortItems.forEach((item: typeIngridient) => {
    const { type } = item;
    if (!typesIngredient[type]) {
      typesIngredient[type] = [];
    }
    typesIngredient[type].push(item);
  });

  const handleScroll = () => {
    const hasCurrent =
      scrollRef.current &&
      bunsRef.current &&
      saucesRef.current &&
      mainsRef.current;
    if (hasCurrent) {
      const scrollContainerPosition =
        scrollRef?.current?.getBoundingClientRect().top;
      const bunHeaderPosition = bunsRef.current!.getBoundingClientRect().top;
      const sauceHeaderPosition =
        saucesRef?.current.getBoundingClientRect().top;
      const mainHeaderPosition = mainsRef?.current.getBoundingClientRect().top;

      const bunsDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
      const saucesDiff = Math.abs(
        scrollContainerPosition - sauceHeaderPosition
      );
      const mainsDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

      if (bunsDiff < saucesDiff) {
        setCurrent("bun");
      } else if (saucesDiff < mainsDiff) {
        setCurrent("sauce");
      } else {
        setCurrent("main");
      }
    }
  };

  return (
    <div className="col">
      <div className="flex">
        {ingredientTypeTitles &&
          Object.keys(ingredientTypeTitles).map((type) => (
            <Tab
              key={type}
              active={current === type}
              onClick={setTab}
              value={type}
            >
              {(ingredientTypeTitles as any)[type]}
            </Tab>
          ))}
      </div>
      <div
        className={`${styles.burgerItems} customScroll`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {typesIngredient &&
          Object.keys(typesIngredient).map((ingredient, index) => (
            <BurgerIngredientSection
              id={ingredient}
              key={ingredient}
              title={(ingredientTypeTitles as any)[ingredient]}
              ingredients={typesIngredient[ingredient]}
              bunsRef={bunsRef}
              saucesRef={saucesRef}
              mainsRef={mainsRef}
            />
          ))}
      </div>
    </div>
  );
}

export default BurgerIngredients;
