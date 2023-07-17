import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import "./styles.css";
import check from "../../Assets/check.svg";
import cross from "../../Assets/cross.svg";

export default function AlertModal({ show }) {
  // taking the show value for modal from props
  // and taking the alert state from reducer
  const AlertState = useSelector((state) => state.alert);

  return (
    <React.Fragment>
      {/* when success happens success modal is shown or else failure modal */}
      {AlertState.type === "success" ? (
        <Modal
          style={{
            borderRadius: "12px",
          }}
          size="sm"
          centered
          show={show}
        >
          <Modal.Title
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="modal-upper-part-success">
              <img src={check} alt="" />
            </div>
            <div className="modal-text">Success !!</div>
          </Modal.Title>
          <Modal.Body>
            <div className="modal-message">{AlertState.message}</div>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          size="sm"
          centered
          show={show}
        >
          <Modal.Title
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="modal-upper-part-error">
              <img src={cross} alt="" />
            </div>
            <div className="modal-text">**Error**</div>
          </Modal.Title>
          <Modal.Body>
            <div className="modal-message">{AlertState.message}</div>
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
}
