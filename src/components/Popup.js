import React from 'react';
import '../styles/Popup.css';

const Popup = ({ children, closePopup = f => f, showPopup = false }) => (
  <React.Fragment>
    {showPopup &&
      <React.Fragment>
        <div id="popup-overlay" onClick={() => closePopup()} />
        <div id="popup-container">
          {children}
        </div>

      </React.Fragment>
    }
  </React.Fragment>
);

export default Popup;
