import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import CreateForm from "./CreateForm";
import { create } from "../../Redux/Actions/qa";
import AlertModal from "../../Components/Modal";

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    let errors = {};
    if (!values.toolId) {
      errors.toolId = "Select the Tool";
    }
    if (!values.question) {
      errors.question = "Question is required";
    }
    if (!values.answer) {
      errors.answer = "Answer is required";
    }
    return errors;
  };

  const callCreateApi = (values) => {
    const userId = localStorage.getItem("user_id");
    if (values) {
      // first creating request body and then sending it to
      // create method to integrate with api
      const requestBody = {
        question: values.question,
        answer: values.answer,
        tool_id: values.toolId,
        user_id: userId,
      };
      dispatch(create(requestBody));
    }
  };

  const AlertState = useSelector((state) => state.alert);

  // after successful creation navigate to home get screen
  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    }
  }, [navigate, AlertState.type]);

  // giving the options to select
  const options = [
    {
      label: "ReactJS",
      value: 1,
    },
    {
      label: "NodeJs",
      value: 2,
    },
    {
      label: "Express",
      value: 3,
    },
    {
      label: "MySQL",
      value: 4,
    },
  ];

  return (
    <React.Fragment>
      <div className="create-container">
        {/* if alert state has some message show the alert modal */}
        {AlertState.message && <AlertModal show={true} />}
        <CreateForm
          validate={validate}
          callCreateApi={callCreateApi}
          options={options}
        />
      </div>
    </React.Fragment>
  );
}
