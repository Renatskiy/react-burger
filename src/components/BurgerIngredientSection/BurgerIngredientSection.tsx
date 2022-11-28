import React from "react";
import { FC } from "react";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredientSection.module.css";
import { typeIngridient } from "../../types/types";

interface Icomponent {
  ingredients: typeIngridient[];
  title: string;
  bunsRef: React.Ref<HTMLDivElement>;
  saucesRef: React.Ref<HTMLDivElement>;
  mainsRef: React.Ref<HTMLDivElement>;
  id?: string;
}
const BurgerIngredientSection: FC<Icomponent> = ({
  title,
  ingredients,
  bunsRef,
  saucesRef,
  mainsRef,
  id,
}) => {
  const refs = () => {
    if (title === "Булки") {
      return bunsRef;
    } else if (title === "Соусы") {
      return saucesRef;
    } else {
      return mainsRef;
    }
  };

  return (
    <div
      id={id}
      className={`${styles.burgerIngredientSection} mt-10}`}
      ref={refs()}
    >
      <div className="title text text_type_main-medium mb-6">{title}</div>
      {ingredients &&
        ingredients.map((ingredient, idx) => (
          <BurgerIngredient
            key={`${ingredient._id}_${idx}`}
            ingredient={ingredient}
          />
        ))}
    </div>
  );
};

export default BurgerIngredientSection;
