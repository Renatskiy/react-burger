import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../services/appContext";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../Icons/Loader";
import styles from "./BurgerConstructor.module.css";
import { fetchPost } from "../../api/index";
export default function BurgerConstructor() {
  const { state, dispatch } = useContext(AppContext);
  const [loader, setLoader] = useState(false);
  const [hasDisabled, setHasDisabled] = useState(false);
  const { burgerConstructor, totalPrice } = state;
  const { bun, ingredients } = burgerConstructor;
  const bunItem = bun?.[0];
  useEffect(() => {
    const bunPrice = bun[0]?.price * 2 || 0;
    const ingredientsPrices = ingredients?.reduce(
      (acc, val) => acc + val.price,
      0
    );
    dispatch({ type: "setPrice", payload: bunPrice + ingredientsPrices });
    if (!bunItem) {
      setHasDisabled(true);
    } else {
      setHasDisabled(false);
    }
  }, [bun, ingredients, dispatch]);

  const handlerName = (name, type) => {
    if (type) {
      if (type === "top") {
        return `${name} (верх)`;
      } else {
        return `${name} (низ)`;
      }
    }
    return name;
  };

  const removeItem = (item, index) => {
    if (item.count > 0) {
      item.count = item.count - 1;
    }
    dispatch({
      type: "removeIngredient",
      payload: index,
    });
  };

  const orderAdd = async () => {
    setLoader(true);

    const bunId = bunItem._id;
    const ingredientsId = ingredients.map(x => x._id);
    const ingredientsData = [bunId, ...ingredientsId, bunId];

    await fetchPost("/orders", ingredientsData)
      .then(response => {
        setLoader(false);
        const { success, order } = response;
        if (success && order) {
          dispatch({ type: "setOrder", payload: order?.number });
          dispatch({
            type: "openModal",
            payload: { modalIsOpen: true, mode: "orderDetails" },
          });
          dispatch({ type: "clearIngredientsSelecteds" });
        }
      })
      .catch(err => {
        setLoader(false);
        console.error("Не получилось оформить заказ");
      });
  };
  return (
    <>
      <div className="col">
        <div className={styles.burgerCards}>
          <div className={styles.BurgerConstructorsWrapper}>
            {bunItem && (
              <div className={`${styles.burgerCard} pr-4` }>
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
              
              className={`${styles.burgerWrapper} customScroll pr-2`}
            >
              {ingredients &&
                ingredients.map((item, index) => {
                  return (
                    <div
                      className={styles.burgerCard}
                      key={`${item._id}_${index}`}
                    >
                      <div className={styles.burderCardIcon}>
                        <DragIcon type="primary" />
                      </div>
                      <ConstructorElement
                        type={item.position}
                        isLocked={item.locker}
                        text={handlerName(item.name, item.position)}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => removeItem(item, index)}
                      />
                    </div>
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
         
          <div
            className={`${styles.price} text text_type_digits-medium mr-10`}
          >
            <span>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={styles.button_wrapper}>
            <Button
              type="primary"
              size="medium"
              onClick={orderAdd}
              disabled={hasDisabled}
              htmlType="button"
            >
              {loader ? <Loader /> : "Оформить заказ"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}