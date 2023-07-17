import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import RegistrationForm from "./RegistrationForm";
import { register } from "../../Redux/Actions/register";
import AlertModal from "../../Components/Modal";

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [savedPath, setSavedPath] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const AlertState = useSelector((state) => state.alert);

  const validate = (values) => {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!(values.email.includes("@") && values.email.includes("."))) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length <= 5) {
      errors.password = "Password must have at least 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm your Password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Your Passwords are not matching";
    }
    return errors;
  };

  const onChangeImage = async (imageFile) => {
    if (imageFile === undefined) {
      return;
    }
    if (
      imageFile.type === "image/jpeg" ||
      "image/jpg" ||
      "image/png" ||
      "image/svg"
    ) {
      setLoading(true);
      const imageToBeUploaded = new FormData();
      imageToBeUploaded.append("file", imageFile);
      imageToBeUploaded.append("upload_preset", "save_qa");
      imageToBeUploaded.append("cloud_name", "dakda5ni3");
      await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
        method: "POST",
        body: imageToBeUploaded,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSavedPath(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
    console.log(savedPath);
  };

  const callRegisterApi = (values) => {
    if (values) {
      const requestBody = {
        name: values.firstName + " " + values.lastName,
        email: values.email,
        password: values.password,
        image: savedPath,
      };
      // console.log(body);
      dispatch(register(requestBody));
    }
  };

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
  }, [navigate, AlertState.type]);

  return (
    <React.Fragment>
      <div className="register-container-with-bg">
        <div className="col">
          <h3 className="head">Registration</h3>
          <span className="redirect-text">
            Already have an account ? Then Please{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h6>Login</h6>
            </Link>
          </span>
        </div>
        {AlertState.message && <AlertModal show={true} />}
        <RegistrationForm
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          toggleShowPassword={toggleShowPassword}
          toggleShowConfirmPassword={toggleShowConfirmPassword}
          validate={validate}
          callRegisterApi={callRegisterApi}
          onChangeImage={onChangeImage}
          savedPath={savedPath}
          loading={loading}
        />
      </div>
    </React.Fragment>
  );
}
