import React, { createContext, useContext, useEffect } from "react";
import { User } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { UserStatus } from "@/pages/TrainsPage/TrainsPage";

interface OnboardingContextProps {
  user: User | null;
}

const OnboardingContext = createContext<OnboardingContextProps>({
  user: null,
});

export const OnboardingProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Если юзер нуждается в онбординге — редирект
    if (
      user.select_samples !== UserStatus.SELECTED &&
      user.select_samples !== UserStatus.REQUIRED_ANCET
    ) {
      // navigate("/equipments?adaptiveMode=true", { replace: true });
    }
  }, [user, navigate]);

  return (
    <OnboardingContext.Provider value={{ user }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
