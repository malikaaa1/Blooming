import React from "react";
import { Link } from "react-router-dom";
import "./Modal.css";

function ModalError({ closeModal }) {
  return (
    <div id="modalContainer">
  
        <h2 className="h">You are not logged in</h2>

      <div className="footer">
        <Link to={`/auth`}>
        <button  id="canselBtn">
         Login
        </button>
        </Link>
      </div>
    </div>
  );
}

export default ModalError;
