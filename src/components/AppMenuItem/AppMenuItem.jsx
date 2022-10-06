import React from 'react'
import styles from "./AppMenuItem.module.css";

class AppMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
      const {Icon, title} = this.props
      return (
        <li className={`${styles.app_menu_item} pt-4 pb-4 pl-5 pr-5`}>
          <div className={`${styles.app_menu_item_icon} "mr-2`}>
            <Icon />
          </div>
          <span className="text text_type_main-default">{title}</span>
        </li>
      );
    }
}

export default AppMenuItem