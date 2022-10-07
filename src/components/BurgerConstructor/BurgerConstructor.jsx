import React from "react";
import PropTypes from "prop-types";
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { typeOrder } from "../../types/types";



class BurgerConstructor extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {orders} = this.props
    const totalPrice = orders.reduce((acc, val) => acc + val.price, 0);

  const getName = (name, type) => {
    if (type) {
      return type === 'top' ? `${name} (верх)` : `${name} (низ)`;
    }return name;
  };

  const bun = orders.find(x => x.type === 'bun');
  const middleItems = orders.filter((x) => x.type !== 'bun');
  const ar = [
   ...middleItems
  ]
  return (
    <div className="col">
        <div className={styles.burger_cards}>
          <div className={styles.constructor_wrapper}>     
            <div className={`${styles.burger_card} pr-4`}>
              <ConstructorElement
                type="top"
                isLocked={bun.locker}
                text={getName(bun.name, "top")}
                price={bun.price}
                thumbnail={bun.image}
              />
          </div>
          <div
            className={`${styles.burger_wrapper} pr-2 customScroll`}
          >
            {ar &&
              ar.map((item, index) => {
                return (
                  <div
                    className={styles.burger_card}
                    key={`${item._id}_${index}`}
                  >
                    {item.type!=='bun' ?
                    (<div className={styles.icon}>
                      <DragIcon type="primary" />
                    </div>):<></>
                    }
                    <ConstructorElement
                      type={item.position}
                      isLocked={item.locker}
                      text={getName(item.name, item.position)}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })}
          </div>
          <div className={styles.constructor_wrapper}>     
          <div className={`${styles.burger_card} pr-4`}>
              <ConstructorElement
                type="bottom"
                isLocked={bun.locker}
                text={getName(bun.name, "bottom")}
                price={bun.price}
                thumbnail={bun.image}
              />
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
          <Button type="primary" size="medium">
            <p>Оформить заказ</p>
          </Button>
        </div>
      </div>
    </div>
  );
  }
}
BurgerConstructor.propTypes = {
  orders: PropTypes.arrayOf(typeOrder).isRequired,
};

export default BurgerConstructor
