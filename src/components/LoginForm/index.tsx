import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useActions } from "../../hooks/useActions";

import Loader from "../Icons/Loader";
import styles from "./styles.module.css";

function LoginForm() {
  const history = useHistory<{ from: string }>();
  const { login } = useActions();
  const [loader, setLoader] = useState<boolean>(false);
  const [form, setValue] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    await login(form);
    setLoader(false);
  };

  if (Cookies.get("accessToken")) {
    return <Redirect to={history?.location?.state?.from || "/"} />;
  }

  return (
    <div className={styles.profileForm}>
      <div
        className={`${styles.profile_form__title} mb-6 text text_type_main-medium`}
      >
        Вход
      </div>
      <form onSubmit={submitForm}>
        <div className={`${styles.profile_form__group} mb-6`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            value={form.email}
            errorText={"Ошибка"}
            onChange={onChange}
          />
        </div>
        <div className={`${styles.profile_form__group} mb-6`}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            name={"password"}
            value={form.password}
            errorText={"Ошибка"}
            onChange={onChange}
          />
        </div>
        <div className={`${styles.profile_form__group} mb-20`}>
          <Button type="primary" size="medium">
            {loader ? <Loader /> : "Войти"}
          </Button>
        </div>
      </form>
      <div className={`${styles.profile_form__group} mb-4`}>
        <p className={`${styles.color_text} text text_type_main-default`}>
          Вы — новый пользователь?
        </p>
        <Link to="/register" className="color_link">
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${styles.profile_form__group} mb-4`}>
        <p className={`${styles.color_text} text text_type_main-default`}>
          Забыли пароль?
        </p>
        <Link to="/forgot-password" className="color_link">
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}
export default LoginForm;
