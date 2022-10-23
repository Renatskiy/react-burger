import React, { useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
  const dispatch = useDispatch();
  const { getIngredients, closeModalAction } = useActions();
  const { error, ingredientSelect } = useSelector(
    (store) => store.ingredientsState
  );
  const { modalIsOpen, modalMode } = useSelector((store) => store.modalState);
  const { orderNumber } = useSelector((store) => store.orderState);
  const fetchData = useCallback(async () => {
    await getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="App">
        {error ? (
          <div className="error-App">
            <p className="text text_type_main-large">
              Произошла ошибка, при получении данных
            </p>
          </div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <AppHeader />
            <Main />
          </DndProvider>
        )}
      </div>
      <Modal
        show={modalIsOpen && modalMode === "IngredientDetails"}
        onClose={() => closeModalAction()}
      >
        <IngredientDetails item={ingredientSelect} />
      </Modal>
      <Modal
        show={modalIsOpen && modalMode === "orderDetails"}
        onClose={() => closeModalAction()}
      >
        <OrderDetails item={orderNumber} />
      </Modal>
    </>
  );
}

export default App;
