"use client";

import { IUser } from "@/models/user.model";
import { useRouter } from "next/navigation";
import { createContext, FC, useContext, useEffect, useMemo, useState } from "react";

const UserServiceContext = createContext<any>(null);

function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const isAdmin = useMemo(() => user?.username === "admin", [user]);
  const isUser = useMemo(() => user?.username === "user", [user]);

  const users = [
    { username: "admin", password: "admin" },
    { username: "user", password: "user" },
  ];

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  function getCurrentUser() {
    let user = self.sessionStorage.getItem("currentUser");
      if (user) {
        return JSON.parse(user);
      }
      return null;
  }

  function setCurrentUser(value: IUser | null) {
    if (value) {
      self.sessionStorage.setItem('currentUser', JSON.stringify(value));
    } else {
      self.sessionStorage.removeItem('currentUser');
    }
    setUser(value);
  }

  function login(user: IUser) {
    if (isValidUser(user)) {
      setCurrentUser(user);
      router.replace("/products");
    }

    return { credentials: !!getCurrentUser() };
  }

  function logout(): void {
    setCurrentUser(null);
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
    isAdmin,
    isUser,
    currentUser: user,
  };
}

export function UserServiceProvider({children}: any) {
  const userService = useUser();
  return (<UserServiceContext.Provider value={userService} >
           {children}
    </UserServiceContext.Provider>);
}

export function useUserService() {
  const user = useContext(UserServiceContext);
  return user;
}

