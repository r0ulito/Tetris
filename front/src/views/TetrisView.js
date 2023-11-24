import React from "react";
import Tetris from "../Tetris_components/Tetris";
import RequireAuth from "../lib/auth";

function TetrisView() {
  RequireAuth();

  return (
    <div className="tetrisview">
      <Tetris />
    </div>
  );
}

export default TetrisView;
