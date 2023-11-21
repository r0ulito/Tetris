import React from 'react';
import './Board.css';

const Board = ({ board }) => {
  return (
    <div className='board'>
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, cellIndex) => {
            const cellColor = cell[1] === 'clear' ? 'white' : 'cyan';
            return (
              <div
                key={cellIndex}
                className='cell'
                style={{ backgroundColor: cellColor }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Board;
