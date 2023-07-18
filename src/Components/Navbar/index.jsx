import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import CreateLink from "./CreateLink";
import LogoutToggler from "./LogoutToggler";
import { toggleThemeAction } from "../../Redux/Actions/toggleTheme";
import { logout } from "../../Redux/Actions/login";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const SwitchMode = useSelector((state) => state.toggleThemeReducer);

  // toggling the mode function
  function toggleMode() {
    dispatch(toggleThemeAction());
  }

  // when user logout is dispatched then just the
  // user info gets removed from local storage
  // so we again navigate him to login page
  function logoutUser() {
    dispatch(logout());
    navigate("/login", { replace: true });
  }
  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: SwitchMode.darkMode
            ? "black"
            : "var(--secondary-color)",
        }}
        className="navbar-container"
      >
        <CreateLink text="Create" />
        <button
          onClick={toggleMode}
          className="btn"
          style={{ color: SwitchMode.darkMode ? "white" : "black" }}
        >
          {" "}
          Hey {user?.name.split(" ")[0]}, you want
          {SwitchMode.darkMode ? " light mode" : " dark mode"} ?
        </button>
        <LogoutToggler
          text="Logout"
          userAvatar={user?.image}
          logout={logoutUser}
        />
      </div>
    </React.Fragment>
  );
}
