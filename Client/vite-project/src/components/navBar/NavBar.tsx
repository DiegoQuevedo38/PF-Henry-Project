import React, { useState } from "react";
import { Link } from "react-router-dom";
import LongMenu from "../dropDown/dropDown";
import "./navBar.css";
import { Avatar } from "antd";

export const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  let user = window.localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    console.log(user);
  }

  return (
    <div className="navBar">
      <div className="navContainer">
        <Link to="/">
          <h2 className="logo"> Rentify </h2>
        </Link>
        <div className="navSeparator"></div>
        <div className="navItems">
          <Link to="/admin">
            <p>Admin</p>
          </Link>
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/rooms">
            <p>Search for rooms</p>
          </Link>
          <Link to="/register-hotel">
            <p>Post a hotel</p>
          </Link>
          {/* <Link to="/reservations">
            <p>Cart Reservation</p>
          </Link> */}
          <Link to="/favorites">
            <p>Favorites</p>
          </Link>
          <Link to="/my-reservations">
            <p>My Reservations</p>
          </Link>
          {user ? (
            <>
              <div className="dropbox">
                <div className="avatar">
                  {user.message}
                  <Avatar
                    alt=""
                    src={user.image}
                    size={48}
                    gap={25}
                    draggable="false"
                  />
                </div>
                <LongMenu />
              </div>
            </>
          ) : (
            <>
              <Link className="btnLogin" to="/login">
                <p>Login</p>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* {showLogin && <Login />} */}
    </div>
  );
};

export default NavBar;
//
