import { Link } from "react-router-dom";
import styles from "./UsersList.module.scss";
import { getInitialLetterColor } from "@/shared/utils/";

export type User = {
  fullname: string;
  user_id: number;
  username: string;
  avatar?: string;
};

type UsersListProps = {
  users: User[];
};

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <div className={styles.root}>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.user_id}>
              <Link to={`/admin/users/user/${user.user_id}`}>
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
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <span>
                    <h5 style={{ margin: "0px", color: "#333" }}>
                      {user.fullname}
                    </h5>
                    <span style={{ color: "#111", fontSize: "15px" }}>
                      @{user.username}
                    </span>
                  </span>
                  <p>#{user.user_id}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
