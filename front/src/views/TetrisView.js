import React from 'react';
import Tetris from '../Tetris_components/Tetris';
import RequireAuth from "../lib/auth";

function TetrisView() {
  RequireAuth()

  return (
    <div className='App'>
      <Tetris />
    </div>
  );
}

export default TetrisView;
