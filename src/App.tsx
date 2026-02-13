import { Route, Routes } from "react-router-dom";
import CallBackPage from "./callback/callback.page";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/callback" element={<CallBackPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
