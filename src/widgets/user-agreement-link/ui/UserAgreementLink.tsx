import { FC } from "react";

import { USER_AGREEMENT_LINK } from "@/shared/constants";
import styles from "./UserAgreementLink.module.scss";
import { cn } from "@/shared/utils";

type UserAgreementLinkProps = {
  className?: string;
};

export const UserAgreementLink: FC<UserAgreementLinkProps> = (props) => {
  const { className } = props;

  return (
    <div className={cn(styles.root, className)}>
      <a href={USER_AGREEMENT_LINK} target="_blank" rel="noreferrer noopener">
        Пользовательское соглашение
      </a>
    </div>
  );
};
