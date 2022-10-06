import React from "react";
import PropTypes from "prop-types";
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { typeOrder } from "../../types/types";

BurgerConstructor.propTypes = {
  orders: PropTypes.arrayOf(typeOrder).isRequired,
};

export default function BurgerConstructor({ orders }) {
  const totalPrice = orders.reduce((acc, val) => acc + val.price, 0);

  const handlerName = (name, type) => {
    if (type) {
      return type === 'top' ? `${name} (верх)` : `${name} (низ)`;
    }return name;
  };

  const top = orders[0];
  const bottom = orders[orders.length - 1];
  const middleItems = orders.filter((x) => x._id !== top._id && x._id !== bottom._id);
  const ar = [
    top, ...middleItems, bottom
  ]
  return (
    <div className="col">
      <div className={styles.burgerCards}>
        <div className={styles.BurgerConstructorsWrapper}>
          <div
            className={`${styles.burgerWrapper} pr-2 customScroll`}
          >
            {ar &&
              ar.map((item, index) => {
                return (
                  <div
                    className={styles.burgerCard}
                    key={`${item._id}_${index}`}
                  >
                    {item.type!=='bun' ?
                    (<div className={styles.burderCardIcon}>
                      <DragIcon type="primary" />
                    </div>):<></>
                    }
                    <ConstructorElement
                      type={item.position}
                      isLocked={item.locker}
                      text={handlerName(item.name, item.position)}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={`${styles.burgerTotalPrice} mt-10 mr-4`}>
        <div className={`${styles.price} text text_type_digits-medium mr-10`}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className="button">
          <Button type="primary" size="medium">
            <p>Оформить заказ</p>
          </Button>
        </div>
      </div>
    </div>
  );
}