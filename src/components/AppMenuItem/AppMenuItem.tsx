import styles from "./AppMenuItem.module.css";
import { FC } from "react";

interface IAppMenuItem {
  title: string;
  Icon: JSX.Element | any;
  onClick: () => void;
  isActive?: boolean | null;
}
const AppMenuItem: FC<IAppMenuItem> = ({ title, Icon, onClick, isActive }) => {
  return (
    <li
      className={`${styles.headerMenuItem} pt-4 pb-4 pl-5 pr-5`}
      onClick={onClick}
    >
      <div className={`${styles.headerMenuItemIcon} mr-2`}>
        <Icon />
      </div>
      <span className="text text_type_main-default">{title}</span>
    </li>
  );
};

export default AppMenuItem;
