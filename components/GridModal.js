import React, { useEffect } from "react";

const GridModal = ({ message, win = false }) => {
  useEffect(() => {
    const callback = () => {
      const elem = document.querySelector("#win-modal");
      const instance = M.Modal.init(elem, {});
    };
    document.addEventListener("DOMContentLoaded", callback);
    if (win) {
      const elem = document.querySelector("#win-modal");
      const instance = M.Modal.init(elem, {});
      instance.open();
    }
    return () => {
      document.removeEventListener("DOMContentLoaded", callback);
    };
  });
  return (
    <div id="win-modal" className="modal">
      <div className="modal-content center">
        <h4>{message}</h4>
      </div>
      <div className="modal-footer center">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          Close
        </a>
      </div>
    </div>
  );
};

export default GridModal;