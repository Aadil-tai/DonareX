import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import PrivateRoute from "./routes/PrivateRoutes";
import ContactMessages from "./components/ContactMessages/ContactMessages";
import Blank from "./pages/Blank";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        <Route
          element={

            <AppLayout />

          }
        >
          <Route index element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/message" element={<ContactMessages />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/buttons" element={<Buttons />} />
        </Route>

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes >
    </Router >
  );
}
