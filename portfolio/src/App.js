import { Route, Routes } from "react-router-dom";
import {
  GUESTBOOK,
  LOGIN,
  MAIN,
  PORTFOLIO_VIEWS,
  SING_UP,
} from "./constants/page_constants";
import MainPage from "./MainPage";
import SignUpPage from "./user/SignUpPage";
import LoginPage from "./user/LoginPage";
import GuestBookPage from "./guestbook/GuestBookPage";
import PortfolioVeiw from "./portfolio/PortfolioVeiw";

function App() {
  return (
    <>
      <Routes>
        <Route path={MAIN} element={<MainPage />} />
        <Route path={SING_UP} element={<SignUpPage />} />
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={GUESTBOOK} element={<GuestBookPage />} />
        <Route path={PORTFOLIO_VIEWS} element={<PortfolioVeiw />} />
      </Routes>
    </>
  );
}

export default App;
