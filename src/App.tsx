import { Route, Routes } from "react-router-dom";
import CallBackPage from "./callback/callback.page";
import HomePage from "./home/home.page";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<CallBackPage />} />
      </Routes>
    </div>
  );
};

export default App;
