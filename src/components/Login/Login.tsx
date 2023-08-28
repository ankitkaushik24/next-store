"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { FormEvent, useContext, useMemo, useReducer } from "react";

import styles from "./login.module.scss";
import { useUserService } from "@/services/UserService";

const initialFormValue = {
  username: "",
  password: "",
};

const formReducer = (
  state: typeof initialFormValue,
  action: "reset" | { name: string; value: string }
) => {
  console.log("action", action);
  if (action === "reset") {
    return initialFormValue;
  }
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function Login() {
  const [{ username, password }, updateForm] = useReducer(
    formReducer,
    initialFormValue
  );
  const invalidState = useMemo(
    () => ({ username: !username?.trim(), password: !password?.trim() }),
    [username, password]
  );

  const userService = useUserService();

  const isFormInvalid = Object.values(invalidState).some((status) => status);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { credentials } = userService.login({ username, password });

    if (credentials === false) {
      alert("Invalid credentials!!");
    }
  };

  return (
    <div className={styles.host}>
      <div className={`${styles["login-bg"]} basis-2/3`}>
        <h1>Making Commerce better for Everyone</h1>
        <h4>
          Your one-stop online store for everything you need. We make shopping
          online easy and convenient
        </h4>
      </div>

      <form
        className={`${styles["login-form"]}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Image
          className={styles["logo-img"]}
          alt="logo"
          src="/shopping.png"
          width="150"
          height="150"
        />

        <TextField
          value={username}
          {...(invalidState.username && {
            error: true,
            helperText: "Username is mandatory",
          })}
          onChange={(e) => updateForm(e.target)}
          name="username"
          label="Username"
          variant="filled"
        />

        <TextField
          value={password}
          {...(invalidState.password && {
            error: true,
            helperText: "Password is mandatory",
          })}
          error={invalidState.password}
          onChange={(e) => updateForm(e.target)}
          name="password"
          label="Password"
          variant="filled"
          type="password"
        />

        <Button variant="contained" type="submit" disabled={isFormInvalid}>
          Login
        </Button>
      </form>
    </div>
  );
}
