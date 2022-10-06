import React from 'react'
import styles from './AppHeader.module.css'
import {
    Logo, ProfileIcon, ListIcon, BurgerIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";
import AppMenuItem from '../AppMenuItem/AppMenuItem'

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className={`${styles.header} pt-4 pb-4`}>
            <div className="container">
              <nav className={styles.headerWrap}>
                <ul className={styles.headerMenuList}>
                  <AppMenuItem title="Конструктор" Icon={BurgerIcon} />
                  <AppMenuItem title="Лента заказов" Icon={ListIcon} />
                </ul>
                <div className={styles.headerLogo}>
                  <Logo />
                </div>
                <AppMenuItem title="Личный кабинет" Icon={ProfileIcon} />
              </nav>
            </div>
          </header>
        )
    }
}
