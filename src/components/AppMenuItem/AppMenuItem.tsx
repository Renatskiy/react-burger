import React from 'react'
import styles from "./AppMenuItem.module.css";

class AppMenuItem extends React.Component<{title: string, Icon: any}, { }> {
    constructor(props: any) {
        super(props);
    }
    render(): React.ReactNode{
        const {Icon, title} = this.props
        return (
            <li className={`${styles.headerMenuItem} pt-4 pb-4 pl-5 pr-5`}>
              <div className={`${styles.headerMenuItemIcon} "mr-2`}>
                <Icon />
              </div>
              <span className="text text_type_main-default">{title}</span>
            </li>
          );
    }
}

export default AppMenuItem