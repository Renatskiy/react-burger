import React from "react";
import styles from "./modalOverlay.module.css";
function ModalOverlay({ onClose }) {
  return <div className={styles.modalOverlay} onClick={onClose}></div>;
}

export default ModalOverlay;
