import React from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function CreateForm(props) {
  const { validate, callCreateApi, options } = props;

  const [initialValues] = React.useState({
    toolId: "",
    question: "",
    answer: "",
  });

  const QaState = useSelector((state) => state.qa);

  // taking the mode's state and changing colors and backgrounds
  const SwitchMode = useSelector((state) => state.toggleThemeReducer);

  return (
    <React.Fragment>
      <div className="glass-effect form-section p-4">
        <Formik
          initialValues={initialValues}
          validate={(values) => validate(values)}
          onSubmit={(values) => callCreateApi(values)}
        >
          {/* destructuring errors and touched */}
          {({ errors, touched }) => (
            <Form>
              <div className="col-md mb-3 form-group">
                <Field
                  as="select"
                  name="toolId"
                  className={
                    errors.toolId && touched.toolId
                      ? "is-invalid tool-selector form-control"
                      : "tool-selector form-control"
                  }
                  style={{
                    backgroundColor: SwitchMode.darkMode ? "black" : "white",
                    color: SwitchMode.darkMode ? "white" : "black",
                  }}
                >
                  {/* taking options from props and mapping them */}
                  <option value="">Select the Tool</option>
                  {options.map((option, idx) => (
                    <option value={option.value} key={idx}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                {errors.toolId && touched.toolId && (
                  <div className="invalid-feedback">{errors.toolId}</div>
                )}
              </div>
              <div className="col-md mb-4 form-group">
                <Field
                  name="question"
                  type="text"
                  placeholder="Enter your Question"
                  className={
                    errors.question && touched.question
                      ? "is-invalid form-control question-field"
                      : "form-control question-field"
                  }
                  style={{
                    backgroundColor: SwitchMode.darkMode ? "black" : "white",
                    color: SwitchMode.darkMode ? "white" : "black",
                  }}
                />
                {errors.question && touched.question && (
                  <div className="invalid-feedback">{errors.question}</div>
                )}
              </div>

              <div className="col-md mb-4 form-group">
                <Field
                  as="textarea"
                  rows="6"
                  name="answer"
                  type="text"
                  placeholder="Enter your Answer"
                  className={
                    errors.answer && touched.answer
                      ? "is-invalid form-control answer-field"
                      : "form-control answer-field"
                  }
                  style={{
                    backgroundColor: SwitchMode.darkMode ? "black" : "white",
                    color: SwitchMode.darkMode ? "white" : "black",
                  }}
                />
                {errors.answer && touched.answer && (
                  <div className="invalid-feedback">{errors.answer}</div>
                )}
              </div>

              {/* if loading from reducer is true show spinner */}
              <button type="submit" className="btn primary-btn">
                Create QA
                {QaState.loading && <Spinner animation="border" />}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default CreateForm;
