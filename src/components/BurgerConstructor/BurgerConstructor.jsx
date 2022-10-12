import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { typeOrder } from "../../types/types";

BurgerConstructor.propTypes = {
  orders: PropTypes.arrayOf(typeOrder).isRequired,
};

export default function BurgerConstructor({ orders }) {
  const totalPrice = useMemo(
    () => orders.reduce((acc, val) => acc + val.price, 0),
    [orders]
  );
  const bun = useMemo(() => orders.find((x) => x.type === "bun"), [orders]);
  const middleItems = useMemo(
    () => orders.filter((x) => x.type !== "bun"),
    [orders]
  );

  const [orderNumber, setOrderNumber] = useState(0);
  const [show, setShow] = useState(false);

  const openModal = (e) => {
    //Эмулируем запросы, якобы получаем данные и сохраняем номер заказа
    setTimeout(() => {
      setOrderNumber(orderNumber + 3);
      setShow(true);
    }, 500);
  };

  const closeModal = () => {
    setShow(false);
  };
  return (
    <>
      <div className="col">
        <div className={styles.burger_cards}>
          <div className={styles.constructor_wrapper}>
            <div className={`${styles.burger_card} pr-4`}>
              {bun && (
                <ConstructorElement
                  type="top"
                  isLocked={bun.locker}
                  text={bun.name + " (верх)"}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              )}
            </div>
            <div className={`${styles.burger_wrapper} pr-2 customScroll`}>
              {middleItems &&
                middleItems.map((item, index) => {
                  return (
                    <div
                      className={styles.burger_card}
                      key={`${item._id}_${index}`}
                    >
                      <div className={styles.icon}>
                        <DragIcon type="primary" />
                      </div>
                      <ConstructorElement
                        type={item.position}
                        isLocked={item.locker}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                      />
                    </div>
                  );
                })}
            </div>
            <div className={styles.constructor_wrapper}>
              <div className={`${styles.burger_card} pr-4`}>
                {bun && (
                  <ConstructorElement
                    type="bottom"
                    isLocked={bun.locker}
                    text={bun.name + " (низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.total_price} mt-10 mr-4`}>
          <div className={`${styles.price} text text_type_digits-medium mr-10`}>
            <span>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className="button">
            <Button
              type="primary"
              size="medium"
              htmlType="button"
              onClick={openModal}
            >
              <p>Оформить заказ</p>
            </Button>
          </div>
        </div>
      </div>
      {show && (
        <Modal show={show} onClose={closeModal}>
          <OrderDetails item={orderNumber} />
        </Modal>
      )}
    </>
  );
}
