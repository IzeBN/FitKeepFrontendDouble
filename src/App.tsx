import { useEffect, useState } from "react";

import { TemplatesPage } from "pages/OwnOffice/TemplatesPage";
import {
  EquipmentsPage,
  HomePage,
  TrainPage,
  TrainsPage,
  MorePage,
  OwnOfficeMain,
  CustomersPage,
  ProgressPage,
  RecomendTemplatePage,
  RecomendTrainPage,
  DashboardPage,
  SubscriptionPage,
  PurchasePage,
} from "./pages/";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ClientPage } from "pages/OwnOffice/ClientPage";
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";
import { UsersPage } from "./pages/UsersPage";
import { OnboardingProvider, UsersProvider } from "./shared/context";
import { FreeTrainsPage } from "./pages/FreeTrains";
import { SurveyModal } from "./widgets";
import { User } from "./entities/user";
import { useGetUserMutation } from "./store/usersApi";
import { tg } from "./constants";
import { Menu, Preloader, TestimonialsWrapper } from "./components";
import { FreeTrainPage } from "./pages/FreeTrainPage/FreeTrainPage";
import { OnboardingPage } from "./pages/onboarding";
import { WayToGoal } from "./pages/way-to-goal";
import { BodyForm } from "./pages/body-form";
import { GirlBodyForm } from "./pages/girl-body-form";
import { UserStatus } from "./pages/TrainsPage/TrainsPage";

function App() {
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [initData, setInitData] = useState<string>();
  const [createUser, { isLoading: isUserLoading }] = useGetUserMutation();
  const [user, setUser] = useState<User | null>(null);

  const handleSurveyModalClose = () => {
    setIsSurveyModalOpen(false);
  };

  useEffect(() => {
    if (!initData && tg?.initData) {
      setInitData(tg.initData);
    }
  }, []);

  useEffect(() => {
    const handleCreateUser = async () => {
      if (!initData) return;

      try {
        const result = await createUser({ init: initData }).unwrap();
        setUser(result || null);

        if (result?.select_samples === UserStatus.REQUIRED_ANCET) {
          setShowModal(true);
          setIsSurveyModalOpen(true);
        }
      } catch (err) {
        console.error("Error:", err);
        setUser(null);
      }
    };

    handleCreateUser();
  }, [initData, createUser]);

  if (isUserLoading) {
    return (
      <div>
        <Router>
          <UsersProvider>
            <Menu />
          </UsersProvider>
        </Router>

        <Preloader hasMenu />
      </div>
    );
  }

  return (
    <div className="App">
      <Toaster position="top-center" />
      <SurveyModal
        isOpen={isSurveyModalOpen && isShowModal}
        onClose={handleSurveyModalClose}
      />

      <Router>
        <UsersProvider>
          <OnboardingProvider user={user}>
            <TestimonialsWrapper>
              <Routes>
              <Route
                path="/free-train-page/:id"
                element={<FreeTrainPage />}
              ></Route>
              <Route path="/more" element={<MorePage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/subscription/:id" element={<PurchasePage />} />

              {initData && user && (
                <>
                  <Route
                    path="/trains"
                    element={<TrainsPage initData={initData} user={user} />}
                  />
                  <Route
                    path="/train-page/:id"
                    element={<TrainPage initData={initData} />}
                  ></Route>
                  <Route
                    path="/equipments"
                    element={<EquipmentsPage user={user} />}
                  ></Route>
                  <Route path="/" element={<HomePage user={user} />} />

                  {/* Страницы повышения конверсии, онбординги */}
                  <Route
                    path="/onboarding"
                    element={<OnboardingPage initData={initData} />}
                  />
                  <Route path="/way-to-goal" element={<WayToGoal />} />
                  <Route
                    path="/body-form"
                    element={<BodyForm initData={initData} />}
                  />
                  <Route
                    path="/girl-body-form"
                    element={<GirlBodyForm initData={initData} />}
                  />
                </>
              )}

              <Route path="/free-trains" element={<FreeTrainsPage />} />
              <Route
                path="/recomend-template/:id"
                element={<RecomendTemplatePage />}
              />
              <Route
                path="/recomend-train-page/:id"
                element={<RecomendTrainPage />}
              />
              <Route path="/own-office" element={<OwnOfficeMain />} />
              <Route path="/own-office/customers" element={<CustomersPage />} />
              <Route path="/own-office/stats" element={<TemplatesPage />} />
              <Route path="/own-office/customers/1" element={<ClientPage />} />
              <Route path="/progress-page" element={<ProgressPage />} />

              {/* Админ панель */}
              <Route path="/admin/" element={<AdminPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/users/user/:id" element={<UserPage />} />
              <Route path="/admin/dashboard" element={<DashboardPage />} />
              </Routes>
            </TestimonialsWrapper>
          </OnboardingProvider>
        </UsersProvider>
      </Router>
    </div>
  );
}

export default App;
