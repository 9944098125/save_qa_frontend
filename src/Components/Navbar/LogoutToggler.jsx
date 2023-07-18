import React from "react";
import { useSelector } from "react-redux";

import ClickOutside from "../../Helpers/ClickOutside";

function LogoutToggler({ text, userAvatar, logout }) {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const SwitchMode = useSelector((state) => state.toggleThemeReducer);

  function toggleShowDropDown() {
    setShowDropDown(!showDropDown);
  }

  const logoutBtnRef = React.useRef(null);

  ClickOutside(logoutBtnRef, toggleShowDropDown);

  return (
    <React.Fragment>
      <div
        onClick={toggleShowDropDown}
        className="avatar-container-with-down-arrow"
      >
        <img src={userAvatar} alt="" />
        <button
          style={{ color: SwitchMode.darkMode ? "white" : "#0096FF" }}
          type="button"
          className="btn down-arrow"
        >
          ≡
        </button>
      </div>
      {showDropDown && (
        <div ref={logoutBtnRef} className="absolute-container zI">
          <button onClick={logout} type="button" className="btn logout-btn">
            {text}
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default LogoutToggler;
