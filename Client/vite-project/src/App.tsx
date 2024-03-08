import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// ? -----------------------------------------------------COMPONENTS
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import NavBar from "./components/navBar/NavBar";
import Favorites from "./components/favorites/Favorites";
import Detail from "./components/detail/Detail";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Notification from "./components/notification system/Notification";
import FormProperty from "./components/FormRegisterProperty/FormPropertyIndex";
import CartReservation from "./components/cart/CartReservation";
import DisableRooms from "./components/DisableRooms/DisableRooms";
import MyReservations from "./components/Reservations/MyReservations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, getReservations } from "./Redux/Actions/actions";
import app from "./components/login/firebaseConfig";
// ? -----------------------------------------------------STYLES
import "./App.css";

interface User {
  email: string;
  password: string;
}
function App() {
  const auth = getAuth(app);
  const [theUser, setTheUser] = useState<User | null>(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setTheUser(user);
    } else {
      setTheUser(null);
    }
  });

  useEffect(() => {
    if (user) {
      dispatch(getReservations(user.uid));
    } else {
      dispatch(authenticateUser(null));
    }
  }, [dispatch, user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/login"
          element={<Login setTheUser={setTheUser} theUser={theUser} />}
        />
        <Route path="/register" element={<Register onSubmit={onsubmit} />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/detail" element={<Detail />} /> */}
        <Route path="/rooms" element={<Home />} />
        <Route path="/reservations" element={<CartReservation />} />
        <Route path="/reservation" element={<Notification />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/register-hotel" element={<FormProperty />} />
        <Route path="/admin" element={<DisableRooms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
