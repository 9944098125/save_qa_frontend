import React from "react";
import { Formik, Form, Field } from "formik";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function RegistrationForm(props) {
  const {
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    validate,
    callRegisterApi,
    onChangeImage,
    savedPath,
    loading,
  } = props;
  // taking all these details from props

  const [formValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const RegisterState = useSelector((state) => state.register);

  return (
    <React.Fragment>
      <div className="glass-effect form-section p-4">
        <Formik
          initialValues={formValues}
          validate={(values) => validate(values)}
          onSubmit={(values) => callRegisterApi(values)}
        >
          {/* destructure the errors and touched from formik props */}
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                {/* first name and last name row */}
                <div className="col-md mb-3 form-group">
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Enter your First Name"
                    className={
                      errors.firstName && touched.firstName
                        ? "is-invalid form-control primary-input-field"
                        : "form-control primary-input-field"
                    }
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                <div className="col-md mb-3 form-group">
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Enter your Last Name"
                    className={
                      errors.lastName && touched.lastName
                        ? "is-invalid form-control primary-input-field"
                        : "form-control primary-input-field"
                    }
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                {/* email field */}
                <div className="col form-group mb-3">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your Email Address..."
                    className={
                      errors.email && touched.email
                        ? "is-invalid form-control primary-input-field"
                        : "form-control primary-input-field"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="d-flex align-items-center">
                  {/* password field with toggling function */}
                  <div className="col form-group">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      className={
                        errors.password && touched.password
                          ? "is-invalid form-control primary-input-field col-md"
                          : "form-control primary-input-field col-md"
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <span
                    style={{ marginLeft: "-60px" }}
                    className="show-text"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                {/* confirming the password and if both are not same it returns an error */}
                <div className="d-flex align-items-center mb-3">
                  <div className="col form-group">
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your Password"
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "is-invalid form-control primary-input-field"
                          : "form-control primary-input-field"
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                  <span
                    style={{ marginLeft: "-60px" }}
                    className="show-text"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? "HIDE" : "SHOW"}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-5 form-group">
                  <div className="col form-group">
                    {/* field for image upload and we should give
                    our own onChange function for that field */}
                    <Field
                      name="savedPath"
                      type="file"
                      className="form-control primary-input-field"
                      onChange={(e) => onChangeImage(e.target.files[0])}
                    />
                    {loading && "Uploading the Image, Please wait..."}
                  </div>
                  <img
                    src={savedPath}
                    alt=""
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "9px",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn register-btn"
              >
                Register
                {RegisterState.loading && <Spinner animation="border" />}
              </button>
              {/* checking if the loading state in register reducer is true and showing spinner */}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default RegistrationForm;
