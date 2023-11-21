import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import { randomTetromino } from './tetrominoes';
import './App.css';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const createBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill([0, 'clear'])
  );

const App = () => {
  const [board, setBoard] = useState(createBoard());
  const [currentTetromino, setCurrentTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: BOARD_WIDTH / 2 - 2, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  const spawnNewTetromino = () => {
    const newTetromino = randomTetromino();
    setPosition({
      x: BOARD_WIDTH / 2 - Math.ceil(newTetromino.shape[0].length / 2),
      y: 0,
    });
    setCurrentTetromino(newTetromino);
  };

  useEffect(() => {
    spawnNewTetromino();
    setBoard(createBoard());
  }, []);

  const checkCollision = (tetromino, offset, board) => {
    for (let y = 0; y < tetromino.shape.length; y++) {
      for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x] !== 0) {
          if (
            !board[y + offset.y] ||
            !board[y + offset.y][x + offset.x] ||
            board[y + offset.y][x + offset.x][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const rotate = (matrix) => {
    const mtrx = matrix.map((_, index) =>
      matrix.map((column) => column[index])
    );
    return mtrx.map((row) => row.reverse());
  };

  const rotateTetromino = () => {
    const newTetromino = JSON.parse(JSON.stringify(currentTetromino)); // Deep clone the tetromino
    newTetromino.shape = rotate(newTetromino.shape);

    const pos = position.x;
    let offset = 1;
    while (
      checkCollision(newTetromino, { x: position.x, y: position.y }, board)
    ) {
      position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > newTetromino.shape[0].length) {
        rotate(newTetromino.shape);
        position.x = pos;
        return;
      }
    }

    setCurrentTetromino(newTetromino);
  };

  const clearLines = (board) => {
    let linesToClear = [];
    for (let y = 0; y < board.length; y++) {
      if (board[y].every((cell) => cell[1] !== 'clear')) {
        linesToClear.push(y);
      }
    }

    if (linesToClear.length > 0) {
      const newBoard = board.filter(
        (_, index) => !linesToClear.includes(index)
      );
      linesToClear.forEach(() =>
        newBoard.unshift(Array(BOARD_WIDTH).fill([0, 'clear']))
      );
      return newBoard;
    }

    return board;
  };

  const updateBoard = (prevBoard, tetromino, pos) => {
    const newBoard = prevBoard.map((row) => row.map((cell) => [...cell]));

    tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const newY = y + pos.y;
          const newX = x + pos.x;
          if (
            newY >= 0 &&
            newY < BOARD_HEIGHT &&
            newX >= 0 &&
            newX < BOARD_WIDTH
          ) {
            newBoard[newY][newX] = [value, `rgba(${tetromino.color}, 0.8)`];
          }
        }
      });
    });

    return newBoard;
  };

  const moveTetrominoDown = useCallback(() => {
    if (!checkCollision(currentTetromino, { x: 0, y: 1 }, board)) {
      setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
    } else {
      setBoard((prev) => updateBoard(prev, currentTetromino, position));
      setBoard((prev) => clearLines(prev));
      if (position.y === 0) {
        setGameOver(true);
      } else {
        spawnNewTetromino();
      }
    }
  }, [currentTetromino, board, position]);

  const move = (dir) => {
    if (!gameOver) {
      if (
        dir === 'left' &&
        !checkCollision(currentTetromino, { x: -1, y: 0 }, board)
      ) {
        setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
      } else if (
        dir === 'right' &&
        !checkCollision(currentTetromino, { x: 1, y: 0 }, board)
      ) {
        setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
      } else if (
        dir === 'down' &&
        !checkCollision(currentTetromino, { x: 0, y: 1 }, board)
      ) {
        setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
      }
    }
  };

  const drop = () => {
    let newPos = { ...position };
    while (!checkCollision(currentTetromino, newPos, board)) {
      newPos.y += 1;
    }
    newPos.y -= 1;
    setPosition(newPos);
  };

  useEffect(() => {
    setBoard((prev) => updateBoard(prev, currentTetromino, position));
  }, [currentTetromino, position]);

  useEffect(() => {
    const gameLoop = () => {
      if (!gameOver) {
        moveTetrominoDown();
      }
    };

    const timerId = setInterval(gameLoop, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [gameOver, position]);

  useEffect(() => {
    console.log(board);
  }, [board]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!gameOver) {
        if (event.keyCode === 37) {
          move('left');
        } else if (event.keyCode === 39) {
          move('right');
        } else if (event.keyCode === 40) {
          drop();
        } else if (event.keyCode === 38) {
          rotateTetromino();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentTetromino, board, gameOver, position]);

  return (
    <div className='App'>
      <Board board={board} />
      {gameOver && <p>Game Over</p>}
    </div>
  );
};

export default App;
