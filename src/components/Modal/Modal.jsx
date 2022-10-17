import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";
import { useHiddenScrollBody } from "../../hooks/useHiddenScrollBody";
import styles from "./modal.module.css";
const ECK_KEYCODE = 27;
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

function Modal({ show, children, onClose }) {
  useHiddenScrollBody(show);

  useEffect(() => {
    const closeOnEsc = (e) => {
      if ((e.charCode || e.keyCode) === ECK_KEYCODE) {
        onClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEsc);
    return (e) => {
      document.body.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pt-15 pb-15 pr-10 pl-10`}>
        <button
          type="button"
          className={styles.modalCloseButton}
          onClick={onClose}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("modals")
  );
}

export default Modal;
