import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import AppHeader from "../AppHeader/AppHeader";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AppMain from "../AppMain/AppMain";
import { WS_CONNECTION_START } from "../../services/actions/ws/types";

// import Cookies from 'js-cookie';
function App() {
  const dispatch = useDispatch();
  const { getIngredients } = useActions();
  const { error } = useTypedSelector((store) => store.ingredientsState);
  const fetchData = useCallback(async () => {
    await getIngredients();
    dispatch({ type: WS_CONNECTION_START });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    fetchData();
    // if (Cookies.get('accessToken')) {
    //   setUserAuth(true);
    // }
  }, [fetchData]);

  return (
    <div>
      <Router>
        <AppHeader />
        {!error && <AppMain />}
      </Router>
    </div>
  );
}

export default App;
