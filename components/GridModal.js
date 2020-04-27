import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const GridModal = ({ message, win = false }) => {
  const modalRef = useRef();
  useEffect(() => {
    const instance = M.Modal.init(modalRef.current, {});
    if (win) {
      instance.open();
    }
  });
  return (
    <div id="win-modal" className="modal" ref={modalRef}>
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
GridModal.propTypes = {
  message: PropTypes.string,
  win: PropTypes.bool.isRequired,
};
GridModal.defaultProps = {
  win: false,
};

export default GridModal;
