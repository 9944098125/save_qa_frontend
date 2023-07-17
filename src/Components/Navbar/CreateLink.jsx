import React from "react";
import { Link } from "react-router-dom";

export default function CreateLink({ text }) {
  return (
    <React.Fragment>
      <Link to="/create" style={{ textDecoration: "none", color: "inherit" }}>
        <button type="button" className="btn create-btn">
          {text}
        </button>
      </Link>
    </React.Fragment>
  );
}
