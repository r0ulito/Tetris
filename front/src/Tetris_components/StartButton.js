import React from "react";

const StartButton = ({ callback }) => (
  <button onClick={callback} className="custom-btn btn btn-black">
    Start Game
  </button>
);

export default StartButton;
