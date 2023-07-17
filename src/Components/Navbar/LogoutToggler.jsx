import React from "react";
import { useSelector } from "react-redux";

function LogoutToggler({ text, userAvatar, logout }) {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const SwitchMode = useSelector((state) => state.toggleThemeReducer);

  function toggleShowDropDown() {
    setShowDropDown(!showDropDown);
  }

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
          ▼
        </button>
      </div>
      {showDropDown && (
        <div className="absolute-container">
          <button onClick={logout} type="button" className="btn logout-btn">
            {text}
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default LogoutToggler;
