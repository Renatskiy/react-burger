import React from "react";
import styles from "./index.module.css";
import { useHistory } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
function Sidebar() {
  const { logoutUser } = useActions();
  const history = useHistory();

  const logout = async () => {
    await logoutUser();

    await history.push("/login");
  };

  return (
    <div className={`${styles.sidebar} mr-15`}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li className={`${styles.nav_item} text text_type_main-medium`}>
            Профиль
          </li>
          <li className={`${styles.nav_item} text text_type_main-medium`}>
            История заказов
          </li>
          <li
            className={`${styles.nav_item} text text_type_main-medium`}
            onClick={logout}
          >
            Выход
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
