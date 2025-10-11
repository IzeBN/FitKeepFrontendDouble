import { useState, useEffect, FC } from "react";

import { Main, Menu, Preloader } from "@/components";
import { UserAgreementLink } from "@/widgets";
import { User } from "@/entities/user";

type HomePageProps = {
  user: User;
};

export const HomePage: FC<HomePageProps> = (props) => {
  const { user } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <Menu active={0} />
        <Preloader hasMenu />
      </>
    );
  }

  return (
    <div className="home-page">
      <Main user={user} />
      <UserAgreementLink />
    </div>
  );
};
