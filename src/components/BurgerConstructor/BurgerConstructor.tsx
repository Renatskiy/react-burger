import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useActions } from "../../hooks/useActions";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import Loader from "../Icons/Loader";
import styles from "./BurgerConstructor.module.css";
import { typeIngridient } from "../../types/types";

interface IBurgerCards {
  onDropHandler: (itemId: { id: string }) => void;
}

export default function BurgerCards({ onDropHandler }: IBurgerCards) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    setPrice,
    removeIngredient,
    sortIngredientActions,
    getOrder,
    setIsLoader,
  } = useActions();
  const { burgerConstructor, totalPrice } = useSelector(
    (state: any) => state.burgerState
  );
  const { ingredients: ingredientsState } = useSelector(
    (state: any) => state.ingredientsState
  );
  const { isAuth } = useSelector((state: any) => state.userState);
  const { loader } = useSelector((state: any) => state.orderState);
  const [hasDisabled, setHasDisabled] = useState(false);
  const { bun, ingredients } = burgerConstructor;
  const bunItem = bun?.[0];

  const [, dropIngredientCard] = useDrop({
    accept: "ingredient-card",
    drop(itemId: { id: string }) {
      onDropHandler(itemId);
    },
  });
  const [, dropIngredient] = useDrop({ accept: "ingredients-sort" });
  useEffect(() => {
    const bunPrice = bun[0]?.price * 2 || 0;
    const ingredientsPrices = ingredients?.reduce(
      (acc: number, val: { price: number }) => acc + val.price,
      0
    );
    setPrice(bunPrice + ingredientsPrices);
    if (!bunItem) {
      setHasDisabled(true);
    } else {
      setHasDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bun, ingredients, dispatch, bunItem]);

  const handlerName = (name: string, type: string) => {
    if (type) {
      if (type === "top") {
        return `${name} (верх)`;
      } else {
        return `${name} (низ)`;
      }
    }
    return name;
  };

  const removeItem = (item: typeIngridient, index: number) => {
    const findItem = ingredientsState.find(
      (x: typeIngridient) => x._id === item._id
    );
    if (findItem && findItem.__v > 0) {
      findItem.__v = findItem.__v - 1;
    }
    removeIngredient(index);
  };

  const orderAdd = async () => {
    setIsLoader(true);
    if (!isAuth) {
      history.push("/login");
      setIsLoader(false);
    }
    if (isAuth) {
      const bunId = bunItem._id;
      const ingredientsId = ingredients.map((x: typeIngridient) => x._id);
      const ingredientsData = [bunId, ...ingredientsId, bunId];
      await getOrder(ingredientsData);
    }
  };

  const findIngredient = useCallback(
    (id) => {
      const findItem = ingredients.find((x: typeIngridient) => x._id === id);

      return {
        findItem,
        index: ingredients.indexOf(findItem),
      };
    },
    [ingredients]
  );
  const sortIngredient = useCallback(
    (index, atIndex) => {
      sortIngredientActions({ index, atIndex });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );
  return (
    <>
      <div className="col">
        <div className={styles.burgerCards}>
          <div
            className={styles.BurgerConstructorsWrapper}
            ref={dropIngredientCard}
          >
            {bunItem && (
              <div className={`${styles.burgerCard} pr-4`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={handlerName(bunItem.name, "top")}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
                />
              </div>
            )}
            <div
              ref={dropIngredient}
              className={`${styles.burgerWrapper} customScroll pr-2`}
            >
              {ingredients &&
                ingredients.map((item: typeIngridient, index: number) => {
                  return (
                    <BurgerConstructorItem
                      key={item._id + index}
                      id={item._id}
                      ingredientsIndex={index}
                      findIngredient={findIngredient}
                      sortIngredient={sortIngredient}
                    >
                      <div className={styles.burderCardIcon}>
                        <DragIcon type="primary" />
                      </div>
                      <ConstructorElement
                        type={item.position}
                        key={item._id}
                        isLocked={item.locker}
                        text={handlerName(item.name, item.position)}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => removeItem(item, index)}
                      />
                    </BurgerConstructorItem>
                  );
                })}
            </div>
            {bunItem && (
              <div className={`${styles.burgerCard} pr-4`}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={handlerName(bunItem.name, "bottom")}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
                />
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.burgerTotalPrice} mt-10 mr-4`}>
          <div className={`${styles.price} text text_type_digits-medium mr-10`}>
            <span>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={styles.button_wrapper}>
            <Button
              type="primary"
              size="medium"
              onClick={orderAdd}
              disabled={hasDisabled}
            >
              {loader ? <Loader /> : "Оформить заказ"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
