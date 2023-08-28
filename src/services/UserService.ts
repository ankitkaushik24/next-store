"use client";

import { IUser } from "@/models/user.model";
import { useRouter } from "next/navigation";
import { createContext, FC, useMemo } from "react";

export function useUserService() {
  const router = useRouter();
  const users = [
    { username: "admin", password: "admin" },
    { username: "user", password: "user" },
  ];

  let { currentUser } = {
    get currentUser() {
      let user = self.sessionStorage.getItem("currentUser");
      if (user) {
        return JSON.parse(user);
      }
      return null;
    },
    set currentUser(value) {
      self.sessionStorage.setItem('currentUser', value && JSON.stringify(value));
    },
  };

  function login(user: IUser) {
    if (isValidUser(user)) {
      currentUser = user;
      router.replace("/products");
    }

    return { credentials: !!currentUser };
  }

  function logout(): void {
    currentUser = null;
    router.replace("/");
  }

  function isValidUser(user: IUser) {
    return users.some(({ username, password }) => {
      return user.username === username && user.password === password;
    });
  }

  return {
    login,
    logout,
    get isAdmin() {
      return currentUser?.username === "admin";
    },
    get isUser() {
      return currentUser?.username === "user";
    },
    currentUser,
  };
}
