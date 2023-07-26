import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const navigate = useNavigate();
  // with this effect a user without logging in can't come in to the home page
  React.useEffect(() => {
    if (!localStorage.getItem("is_authenticated")) {
      navigate("/login", { replace: true });
    }
  }, []);

  // if logged in value is true in local storage
  // then return children components in the protected route
  return props.children;
}
