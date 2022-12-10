import React, { useState, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../LoginForm/styles.module.css";
import classNames from "classnames";
import { useActions } from "../../hooks/useActions";
function ResetForm() {
  const location = useLocation<{ from: Location }>();
  const history = useHistory();
  const { resetPassword } = useActions();
  const { user } = useTypedSelector((state) => state.userState);
  const [form, setValue] = useState<{ password: string; token: string, code: string }>({
    password: "",
    token: "",
    code: "",
  });
  const [disabledBtn, setdisabledBtn] = useState(true);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, token: e.target.value });
  };
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, password: e.target.value });
  };

  useEffect(() => {
    if (form.password.length && form.token.length) {
      setdisabledBtn(false);
    } else {
      setdisabledBtn(true);
    }
  }, [form]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.token) {
      const res = await resetPassword(form);
      if (res) {
        history.push("/login");
      }
    }
  };

  if (user) {
    return <Redirect to={"/"} />;
  }
  if (
    !location.state ||
    (location.state && location.state.from.pathname !== "/forgot-password")
  ) {
    return <Redirect to={"/forgot-password"} />;
  }
  return (
    <div className={styles.profileForm}>
      <div
        className={classNames(
          styles.profile_form__title,
          "mb-6 text text_type_main-medium"
        )}
      >
        Восстановление пароля
      </div>
      <form onSubmit={submitForm}>
        <div className={classNames(styles.profile_form__group, "mb-6")}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            name={"passowrd"}
            value={form.password}
            icon={"ShowIcon"}
            onChange={onChangePass}
          />
        </div>
        <div className={classNames(styles.profile_form__group, "mb-6")}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"token"}
            value={form.token}
            onChange={onChange}
          />
        </div>
        <div className={classNames(styles.profile_form__group, "mb-20")}>
          <Button type="primary" size="medium" disabled={disabledBtn}>
            Сохранить
          </Button>
        </div>
      </form>
      <div className={classNames(styles.profile_form__group, "mb-4")}>
        <p
          className={classNames(
            styles.color_text,
            "text text_type_main-default"
          )}
        >
          Вспомнили пароль?
        </p>
        <Link to="/login" className="color_link">
          Войти
        </Link>
      </div>
    </div>
  );
}
export default ResetForm;
