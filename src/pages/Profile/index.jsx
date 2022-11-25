import React from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./profilePage.module.css";
function Profile({ children }) {
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
