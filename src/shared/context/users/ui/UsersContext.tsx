import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetUsersMutation } from "@/store/usersApi";
import { User } from "@/features/users";
import { tg } from "@/constants";
import { useLocation } from "react-router-dom";

const UsersContext = createContext<any>(null);

export const UsersProvider = ({ children }: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const location = useLocation();

  const allowedPaths = ["/admin", "/admin/users", "/admin/users/user"];

  const shouldLoadUsers = allowedPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  useEffect(() => {
    if (!shouldLoadUsers) {
      return;
    }

    const initData = tg?.initData;

    if (initData) {
      getUsers({ init: initData })
        .unwrap()
        .then((result) => setUsers(result.users))
        .catch((err) => {
          console.error("Error loading users:", err);
          if (err && err.status) {
            const code = err.status;
            const message = err.data?.message || "Неизвестная ошибка";
            // Ошибка API
          } else {
            // Неизвестная ошибка запроса
          }
        });
    } else {
      console.warn("initData отсутствует, пользователи не будут загружены.");
    }
  }, [getUsers, location.pathname]);

  return (
    <UsersContext.Provider value={{ users, isLoading }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
