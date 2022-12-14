import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import HomePage from "../../pages/HomePage";
import ProtectedRoute from "../ProtectedRoute";
import ForgotPassword from "../../pages/ForgotPassword";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassword";
import IngredientsDetails from "../IngredientDetails/IngredientDetails";
import ProfileForm from "../ProfileForm";
import Modal from "../Modal/Modal";
function AppMain() {
  const history = useHistory();
  const location = useLocation();

  const { state: locationState } = useLocation() as {
    state: { background?: typeof location } | null;
  };

  let { background } = locationState ?? {};

  const { closeModalAction } = useActions();

  if (history.action !== "PUSH") {
    background = undefined;
  }

  const closeModalIgredient = () => {
    closeModalAction();
    history.push("/");
  };
  return (
    <main>
      <Switch location={background || location}>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile>
            <ProfileForm />
          </Profile>
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          <IngredientsDetails />
        </Route>
        <Route exact path="/logout">
          <Profile children={undefined} />
        </Route>
      </Switch>
      {background && (
        <Route path={"/ingredients/:id"}>
          <Modal show={true} onClose={() => closeModalIgredient()}>
            <IngredientsDetails />
          </Modal>
        </Route>
      )}
    </main>
  );
}
export default AppMain;
