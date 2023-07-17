import React from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function LoginForm(props) {
  const { showPassword, toggleShowPassword, validate, callLoginApi } = props;

  const LoginState = useSelector((state) => state.login);

  const [formValues] = React.useState({
    email: "",
    password: "",
  });

  return (
    <React.Fragment>
      <div className="glass-effect form-section p-4">
        <Formik
          initialValues={formValues}
          validate={(values) => validate(values)}
          onSubmit={(values) => callLoginApi(values)}
        >
          {/* destructuring errors and touched from formik props */}
          {({ errors, touched }) => (
            <Form>
              <div className="col-md mb-3">
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your Email Address..."
                  className={
                    errors.email && touched.email
                      ? "is-invalid form-control login-input-field"
                      : "form-control login-input-field"
                  }
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="col form-group">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    className={
                      errors.password && touched.password
                        ? "is-invalid form-control login-input-field col-md"
                        : "form-control login-input-field col-md"
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

              <button type="submit" className="btn login-btn">
                Login
                {LoginState.loading && <Spinner animation="border" />}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default LoginForm;
