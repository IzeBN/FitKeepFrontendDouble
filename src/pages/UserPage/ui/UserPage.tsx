import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, Preloader } from "@/components";
import { useUsers } from "@/shared/context/";
import {
  useSendMessageMutation,
  useGetUserActionsMutation,
} from "@/store/usersApi";
import styles from "./UserPage.module.scss";
import { formatScheduleDate, getInitialLetterColor } from "@/shared/utils";
import { tg } from "@/constants";
import { ReactComponent as BackArrow } from "@/assets/img/back-arrow.svg";

export const UserPage = () => {
  const { id } = useParams();
  const { users, isLoading } = useUsers();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sendMessage, { isLoading: isSending, isSuccess, isError }] =
    useSendMessageMutation();
  const [
    getUserActions,
    { data: actionsData, isLoading: isActionsLoading, isError: isActionsError },
  ] = useGetUserActionsMutation();

  const user = users.find((u: any) => u.user_id === Number(id));

  useEffect(() => {
    if (tg) {
      tg.expand();
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      getUserActions({
        init: tg?.initData || "",
        user_id: user.user_id,
      })
        .unwrap()
        .then((res) => {
          // Получены данные пользователя
        })
        .catch((err) => {
          console.error("Ошибка при получении actions:", err);
        });
    }
  }, [user, getUserActions]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage({
        init: tg?.initData || "",
        user_id: Number(id),
        msg: message,
      }).unwrap();

      setMessage("");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Не удалось отправить сообщение.");
    }
  };

  if (loading || isLoading) {
    return (
      <>
        <Menu active={0} />
        <Preloader hasMenu />
      </>
    );
  }

  if (!user) {
    return (
      <div className={styles.userPage}>
        <Menu />
        <div className={styles.notFound}>Пользователь не найден</div>
      </div>
    );
  }

  return (
    <div className={styles.userPage}>
      <Link to="/admin/users" className={styles.back}>
        <BackArrow />

        <span style={{ marginLeft: "10px" }}>Назад</span>
      </Link>
      <Menu />
      <div
        className={styles.profile}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {user.avatar ? (
            <img src={user.avatar} alt={"avatar"} />
          ) : (
            <span
              className={styles.avatar}
              style={{
                backgroundColor: getInitialLetterColor(user.fullname),
              }}
            >
              {user.fullname.split(" ")[0][0]}
            </span>
          )}
          <div className={styles.info}>
            <h2 className={styles.name}>{user.fullname}</h2>
            <p className={styles.username}>@{user.username}</p>
          </div>
        </div>
        <p>#{user.user_id}</p>
      </div>

      <textarea
        className={styles.messageTextarea}
        name="message-to-user"
        id="message-to-user"
        placeholder="Написать сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isSending}
      ></textarea>
      <button
        className={styles.sendMessageButton}
        onClick={handleSendMessage}
        disabled={isSending}
      >
        {isSending ? "Отправка..." : "Отправить"}
      </button>
      {isSuccess && (
        <p className={styles.successMsg}>Сообщение успешно отправлено!</p>
      )}
      {isError && (
        <p className={styles.errorMsg}>Ошибка при отправке сообщения.</p>
      )}

      {isActionsLoading && <p>Загрузка действий...</p>}
      {isActionsError && <p>Ошибка при загрузке действий.</p>}
      {actionsData &&
        actionsData.actions.map((action: any) => (
          <div key={action.id}>
            <h4 style={{ marginBottom: "5px", color: "#333" }}>
              {action.action}
            </h4>
            <p>{formatScheduleDate(action.of_date, true)}</p>
            <hr style={{ opacity: "0.4" }} />
          </div>
        ))}
    </div>
  );
};
