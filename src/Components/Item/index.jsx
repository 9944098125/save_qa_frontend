import React from "react";
import { Spinner } from "react-bootstrap";

import {
  ItemContainer,
  RowsInItem,
  Btn,
  QaText,
  GlassEffect,
} from "./styledComponents";
import { useSelector, useDispatch } from "react-redux";
import UpdateModal from "../UpdateModal";
import { del, read } from "../../Redux/Actions/qa";
import AlertModal from "../Modal";

export default function Item(props) {
  const dispatch = useDispatch();
  const { qa, idx } = props;

  // take some initial data in the object
  const oldData = {
    id: null,
    question: null,
    answer: null,
  };
  const [showUpdateModal, setShowUpdateModal] = React.useState({
    id: null,
    bool: false,
    dataWithId: { ...oldData },
  });

  const [deleteLoader, setDeleteLoader] = React.useState({
    id: null,
    bool: false,
  });

  // method to show the update modal with the particular id
  // and giving the data in it according to it
  const showUpdateQa = (qa) => {
    setShowUpdateModal({
      id: qa.id,
      bool: !showUpdateModal.bool,
      dataWithId: { ...qa },
    });
  };

  // deleting the qa set according to id
  const eliminate = (qaId) => {
    setDeleteLoader({ id: qaId, bool: true });
    dispatch(del(qaId));
    setShowUpdateModal(false);
  };

  const userId = localStorage.getItem("user_id");
  // taking the state of the alert
  const AlertState = useSelector((state) => state.alert);

  // here we call this get method so that after we delete the qa set
  // immediately it again renders the list of remaining qa sets.
  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        dispatch(read(userId, qa.tool_id));
      }, 3000);
    }
  }, [qa, AlertState.type, dispatch, userId]);

  const SwitchMode = useSelector((state) => state.toggleThemeReducer);

  return (
    <React.Fragment>
      <div className="whole-items-container">
        {AlertState.message && <AlertModal show={true} />}
        <GlassEffect>
          <ItemContainer color={SwitchMode.darkMode ? "white" : "black"}>
            <RowsInItem jc="space-between">
              <div className="d-flex align-items-center gap-5 text-width-in-box">
                <QaText fw="800">{idx + 1}</QaText>
                <QaText fw="700">{qa.question}</QaText>
              </div>
              {/* on clicking this btn the state showUpdateModal becomes
              true with the id of qa on which we click and in the modal
              also the same qa set is shown */}
              <Btn onClick={() => showUpdateQa(qa)} bg="violet">
                Update
              </Btn>
              {showUpdateModal.bool && showUpdateModal.id === qa.id && (
                <UpdateModal
                  showUpdateModal={showUpdateModal}
                  qa={qa}
                  setShowUpdateModal={setShowUpdateModal}
                />
              )}
            </RowsInItem>
            <RowsInItem jc="space-between">
              <div className="d-flex align-items-center gap-5 text-width-in-box">
                <QaText fw="800">{"=>"}</QaText>
                <QaText fw="500">{qa.answer}</QaText>
              </div>
              {/* showing spinner for delete btn when clicked and
               deleted that qa with deleteLoader state and id from qa */}
              <Btn onClick={() => eliminate(qa.id)} bg="red">
                Delete
                {deleteLoader.id === qa.id && deleteLoader.bool && (
                  <Spinner animation="border" />
                )}
              </Btn>
            </RowsInItem>
          </ItemContainer>
        </GlassEffect>
      </div>
    </React.Fragment>
  );
}
