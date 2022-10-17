import { string } from "prop-types";
import PropTypes from "prop-types";
import React from "react";
import styles from "./AppMenuItem.module.css";

AppMenuItem.propTypes = {
  title: string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
export default function AppMenuItem({ Icon, title }) {
  return (
    <li className={styles.menu_list}>
      <a href="#" className={`${styles.app_menu_item} pt-4 pb-4 pl-5 pr-5`}>
        <div className={`${styles.app_menu_item_icon} "mr-2`}>
          <Icon />
        </div>
        <span className="text text_type_main-default">{title}</span>
      </a>
    </li>
  );
}
