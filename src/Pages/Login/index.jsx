import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import LoginForm from "./LoginForm";
import { login } from "../../Redux/Actions/login";
import AlertModal from "../../Components/Modal";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const LoginState = useSelector((state) => state.login);
  const AlertState = useSelector((state) => state.alert);

  // toggling the show btn in input field for password
  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!(values.email.includes("@") || values.email.includes("."))) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length <= 5) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  }

  // if values do exist dispatch login function.
  function callLoginApi(values) {
    if (values) {
      dispatch(login(values));
    }
  }

  // if isAuthenticated state in login reducer is true or
  // token in the local storage has something then navigate to home
  React.useEffect(() => {
    if (LoginState.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate, LoginState.isAuthenticated]);

  return (
    <React.Fragment>
      <div className="login-container-with-bg">
        {AlertState.message && <AlertModal show={true} />}
        <div className="col">
          <h3 className="head">Login</h3>
          <span className="redirect-text">
            Don't have an account ? Please
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h6>Register</h6>
            </Link>
          </span>
        </div>
        <LoginForm
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          validate={validate}
          callLoginApi={callLoginApi}
        />
      </div>
    </React.Fragment>
  );
}
