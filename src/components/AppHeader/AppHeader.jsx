import React from "react";
import styles from "./AppHeader.module.css";
import {
  Logo,
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppMenuItem from "../AppMenuItem/AppMenuItem";

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className="container">
        <nav className={styles.header_wrapper}>
          <ul className={styles.header_menu}>
            <AppMenuItem title="Конструктор" Icon={BurgerIcon} />
            <AppMenuItem title="Лента заказов" Icon={ListIcon} />
          </ul>
          <div className={styles.header_logo}>
            <Logo />
          </div>
          <AppMenuItem title="Личный кабинет" Icon={ProfileIcon} />
        </nav>
      </div>
    </header>
  );
}
