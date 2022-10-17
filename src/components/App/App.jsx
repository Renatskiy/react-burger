import React, {useCallback} from "react";

import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useEffect, useState, useReducer } from "react";
import { AppContext } from "../../services/appContext";
import { appReducer } from "../../services/appReduces";
import Main from "../Main/Main";
import { fetchRequest } from "../../api/index";

const initialState = {
  ingredients: [],
  ingredientSelect: {},
  error: false,
  modalMode: "",
  modalIsOpen: false,
  burgerConstructor: {
    bun: [],
    ingredients: [],
  },
  totalPrice: 0,
  orderNumber: 0,
};

export default function App() {

  const [state, dispatch] = useReducer(appReducer, initialState, undefined);
  const fetchData = useCallback(async () => {
    await fetchRequest("/ingredients")
      .then(response => {
        const { data, success } = response;
        if (success && data) {
          dispatch({ type: "setIngredients", payload: data });
        }
      })
      .catch(error => {
        dispatch({ type: "setError", payload: true });
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        {state.error ? (
          <div className="error-App">
            <p className="text text_type_main-large">
              Произошла ошибка, при получении данных
            </p>
          </div>
        ) : (
          <>
            <AppHeader />
            <Main />
          </>
        )}
      </div>
      <Modal
        show={state.modalIsOpen && state.modalMode === "IngredientDetails"}
        onClose={() => dispatch({ type: "closeModal" })}
      >
        <IngredientDetails item={state.ingredientSelect} />
      </Modal>
      <Modal
        show={state.modalIsOpen && state.modalMode === "orderDetails"}
        onClose={() => dispatch({ type: "closeModal" })}
      >
        <OrderDetails item={state.orderNumber} />
      </Modal>
    </AppContext.Provider>
  );
}
