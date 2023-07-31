import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const navigate = useNavigate();
  const LoginState = useSelector((state) => state.login);
  // with this effect a user without logging in can't come in to the home page
  React.useEffect(() => {
    if (!LoginState.token || !localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);

  // if logged in value is true in local storage
  // then return children components in the protected route
  return props.children;
}
