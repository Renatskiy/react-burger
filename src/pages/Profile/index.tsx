import React from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./profilePage.module.css";

export interface LayoutProps {
  children?: React.ReactNode;
}
function Profile({ children }: LayoutProps) {
  return (
    <div className="container">
      <div className={styles.lkWrapper}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
export default Profile;
