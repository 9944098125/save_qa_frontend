import React, { useCallback } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import { read, update } from "../../Redux/Actions/qa";
import AlertModal from "../Modal";

export default function UpdateModal(props) {
  const dispatch = useDispatch();
  const { showUpdateModal, qa, setShowUpdateModal } = props;
  // console.log(qa);

  // with useCallback we are creating a new instance of this function
  // which will reduce unnecessary re-creation of the function for
  // each render and improved performance.
  const closeModal = useCallback(() => {
    setShowUpdateModal(false);
  }, []);

  const SwitchMode = useSelector((state) => state.toggleThemeReducer);

  // giving some initialValues with dataWithId from qaItem
  const [initialValues] = React.useState({
    id: qa?.id,
    question: qa?.question,
    answer: qa?.answer,
  });

  function validate(values) {
    let errors = {};

    if (!values.question) {
      errors.question = "Question is required";
    }
    if (!values.answer) {
      errors.answer = "Answer is required";
    }
    return errors;
  }

  function callUpdateApi(values) {
    if (values) {
      // here giving question and answer to body in the request
      const requestBody = {
        question: values.question,
        answer: values.answer,
      };
      // and giving the id of the qa set to the params
      dispatch(update(values.id, requestBody));
    }
  }

  const AlertState = useSelector((state) => state.alert);
  const QaState = useSelector((state) => state.qa);

  // if successfully updated closing the modal
  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        closeModal();
      }, 3000);
    }
  }, [AlertState.type, closeModal]);

  const userId = localStorage.getItem("user_id");
  // calling get method here again so that it renders the list after successful update
  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        dispatch(read(userId, qa.tool_id));
      }, 3000);
    }
  }, [dispatch, qa.tool_id, AlertState, userId]);

  return (
    <React.Fragment>
      {AlertState.message && <AlertModal show={true} />}
      <Modal
        // setting the backdrop of modal to be static so once opened
        // clicked outside it doesn't close
        backdrop="static"
        onHide={closeModal}
        show={showUpdateModal.bool}
        size="lg"
        centered
      >
        <div
          className="form-section p-2"
          style={{
            backgroundColor: SwitchMode.darkMode ? "black" : "white",
            color: SwitchMode.darkMode ? "white" : "black",
          }}
        >
          <Modal.Header closeButton>
            Update your Question & Answer set
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              validate={(values) => validate(values)}
              onSubmit={(values) => callUpdateApi(values)}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group col-md mb-4">
                    <Field
                      name="question"
                      type="text"
                      placeholder="Edit your question"
                      className={
                        errors.question && touched.question
                          ? "is-invalid form-control question-field"
                          : "form-control question-field"
                      }
                      style={{
                        backgroundColor: SwitchMode.darkMode
                          ? "black"
                          : "white",
                        color: SwitchMode.darkMode ? "white" : "black",
                      }}
                    />
                    {errors.question && touched.question && (
                      <div className="invalid-feedback">{errors.question}</div>
                    )}
                  </div>

                  <div className="form-group mb-4 col-md">
                    <Field
                      as="textarea"
                      rows="6"
                      type="text"
                      name="answer"
                      placeholder="Edit your Answer"
                      className={
                        errors.answer && touched.answer
                          ? "is-invalid form-control answer-field"
                          : "form-control answer-field"
                      }
                      style={{
                        backgroundColor: SwitchMode.darkMode
                          ? "black"
                          : "white",
                        color: SwitchMode.darkMode ? "white" : "black",
                      }}
                    />
                    {errors.answer && touched.answer && (
                      <div className="invalid-feedback">{errors.answer}</div>
                    )}
                  </div>

                  <button type="submit" className="primary-btn">
                    Update {QaState.loading && <Spinner animation="border" />}
                  </button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </div>
      </Modal>
    </React.Fragment>
  );
}
