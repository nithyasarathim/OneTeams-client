import { Route, Routes } from "react-router-dom";
import CallBackPage from "./oAuth/callback.page";
import HomePage from "./home/home.page";
import OAuthPage from "./oAuth/auth.page";
import GuestRoute from "./routes/guest.route";
import AuthorizedRoute from "./routes/authorize.route";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <OAuthPage />
            </GuestRoute>
          }
        />
        <Route
          path="/callback"
          element={
            <GuestRoute>
              <CallBackPage />
            </GuestRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthorizedRoute>
              <HomePage />
            </AuthorizedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
