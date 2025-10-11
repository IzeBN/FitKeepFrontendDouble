import { Menu } from "@/components";
import { ActionButton } from "@/shared/ui";

export const AdminPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Menu />
      <ActionButton label={"Пользователи"} to="/admin/users" />
      <ActionButton label={"Дашборд"} to="/admin/dashboard" />
    </div>
  );
};
