import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

import "./styles.css";
import { read } from "../../Redux/Actions/qa";
import Item from "../../Components/Item";
import AlertModal from "../../Components/Modal";

export default function Home() {
  const dispatch = useDispatch();

  // setting the default toolId so that it will show qa sets related to toolId 1
  const [toolId, setToolId] = React.useState(1);

  const QaState = useSelector((state) => state.qa);
  // console.log(QaState.qaList);
  const SwitchMode = useSelector((state) => state.toggleThemeReducer);
  const AlertState = useSelector((state) => state.alert);

  // onChange method for select tag for toolId
  const selectTool = (e) => {
    setToolId(e.target.value);
  };

  const userId = localStorage.getItem("user_id");
  // here we are retrieving the data from the table according
  // to userId and toolId
  React.useEffect(() => {
    dispatch(read(userId, toolId));
  }, [dispatch, userId, toolId]);

  return (
    <React.Fragment>
      <div className="home-container">
        {AlertState.message && <AlertModal show={true} />}
        <div className="input-container">
          {/* here we are not using formik so we are implementing in the 
          normal method with onChange and giving value and all */}
          <select
            style={{
              backgroundColor: SwitchMode.darkMode ? "black" : "white",
              color: SwitchMode.darkMode ? "white" : "black",
            }}
            onChange={selectTool}
            name="toolId"
            value={toolId}
            id=""
            className="tool-selector"
          >
            <option value="">Select a Tool</option>
            <option value={1}>ReactJS</option>
            <option value={2}>NodeJS</option>
            <option value={3}>Express</option>
            <option value={4}>MySQL</option>
          </select>
        </div>
        {/* if QaState.qaList state has something in it then show the 
      Item component with that data */}
        {QaState.qaList ? (
          QaState.qaList.map((qa, idx) => <Item key={idx} qa={qa} idx={idx} />)
        ) : (
          // or else show spinner
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
