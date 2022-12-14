import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../LoginForm/styles.module.css";
import { useActions } from "../../hooks/useActions";
function RegisterForm() {
  const history = useHistory();
  const location = useLocation();

  const { forgotPassword } = useActions();
  const { isForgotPasswordRequest } = useTypedSelector(
    (state) => state.userState
  );
  const [form, setValue] = useState<{ email: string }>({ email: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await forgotPassword(form);
    if (isForgotPasswordRequest) {
      history.push("/reset-password", { from: location });
    }
  };

  if (Cookies.get("accessToken")) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={styles.profileForm}>
      <div
        className={`${styles.profile_form__title} mb-6 text text_type_main-medium`}
      >
        Восстановление пароля
      </div>
      <form onSubmit={submitForm}>
        <div className={`${styles.profile_form__group} mb-6`}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            name={"email"}
            errorText={"Ошибка"}
            value={form.email}
            onChange={onChange}
          />
        </div>
        <div className={`${styles.profile_form__group} mb-20`}>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={`${styles.profile_form__group} mb-4`}>
        <p className={`${styles.color_text} text text_type_main-default`}>
          Вспомнили пароль?
        </p>
        <Link to="/login" className="color_link">
          Войти
        </Link>
      </div>
    </div>
  );
}
export default RegisterForm;
