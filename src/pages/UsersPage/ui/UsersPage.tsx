import { useState, useEffect } from "react";

import { Menu, Preloader } from "@/components";
import { UsersList } from "@/features/users";
import { tg } from "@/constants";
import { useGetUsersMutation } from "@/store/usersApi";
import { User } from "@/features/users/";

import { ReactComponent as BackArrow } from "@/assets/img/back-arrow.svg";
import { Link } from "react-router-dom";

import styles from "./UsersPage.module.scss";

export const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [initData, setInitData] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<User[]>([]);
  const [isAdminRoot, setAdminRoot] = useState(false);

  const [getUsers, { isLoading: usersLoading }] = useGetUsersMutation();

  useEffect(() => {
    if (initData) {
      getUsers({ init: initData })
        .unwrap()
        .then((result) => {
          setUsers(result.users);
          setAdminRoot(true);
        })
        .catch((err) => {
          console.error("Ошибка при получении пользователей:", err);

          if (err.status === 403) {
            window.location.href = "/";
          }

          if (err && err.status) {
            const code = err.status;
            const message = err.data?.message || "Неизвестная ошибка";

            // Ошибка API
          } else {
            // Неизвестная ошибка запроса
          }
        });
    }
  }, [initData, getUsers]);

  useEffect(() => {
    if (!initData) {
      tg.ready();
      setInitData(tg?.initData);
    }

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [initData]);

  if (loading || usersLoading || !isAdminRoot) {
    return (
      <>
        <Menu active={0} />
        <Preloader hasMenu />
      </>
    );
  }

  return (
    <div className="admin-page">
      <Link to="/admin/" className={styles.back}>
        <BackArrow />
        <span style={{ marginLeft: "10px" }}>Назад</span>
      </Link>
      <Menu />
      <div style={{ textAlign: "center" }}>
        <h2>Пользователи</h2>
      </div>
      <UsersList users={users} />
      <Menu />
    </div>
  );
};
