import './App.css';
import React, {useState} from 'react';

const ai = 'X';
const user = 'O';

function App() {
  const [board, changeBoard] = useState([
    ai,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [gameWon, changeGameWon] = useState(false);
  const [winner, setWinner] = useState('');
  const [count, setCount] = useState(1);
  const checkWinner =
      (array) => {
        let winners = [
          [0, 1, 2],
          [0, 3, 6],
          [0, 4, 8],
          [3, 4, 5],
          [1, 4, 7],
          [2, 5, 8],
          [6, 7, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < winners.length; i++) {
          if (array[winners[i][0]] != '' &&
              array[winners[i][0]] === array[winners[i][1]] &&
              array[winners[i][1]] === array[winners[i][2]]) {
            return array[winners[i][0]];
          }
        }
        return null;
      }

  const bestMove =
      (array) => {
        let bestScore = -Infinity;
        let theMove = 0;
        for (let i = 0; i < 9; i++) {
          if (array[i] === '') {
            array[i] = ai;
            let score = minimax(array, 0, false);
            if (score > bestScore) {
              bestScore = score;
              theMove = i;
            }
            array[i] = '';
          }
        }
        array[theMove] = ai;
        setCount(count + 2);
        changeBoard(array);
      }

  const minimax = (array, depth, isMaxi) => {
    let result = checkWinner(array);
    if (result !== null) {
      return result == 'X' ? 1 : -1;
    }
    let bestScore = isMaxi ? -Infinity : Infinity;
    for (let i = 0; i < 9; i++) {
      if (array[i] === '') {
        array[i] = isMaxi ? ai : user;
        let score = minimax(array, depth + 1, !isMaxi);
        if ((score > bestScore && isMaxi) || (score < bestScore && !isMaxi)) {
          bestScore = score;
        }
        array[i] = '';
      }
    }
    return bestScore;
  };

  const moveAI =
      (array) => {
        bestMove(array);
        let w = checkWinner(array);
        if (w !== null) {
          setWinner(w);
          changeGameWon(true);
        } else if (count == 7) {
          setWinner('tie');
        }
      }

  const clicked =
      (index) => {
        if (gameWon) return;
        let array = [...board];
        if (array[index] === '') {
          array[index] = user;
          changeBoard(array);
          let w = checkWinner(array);
          if (w === null) {
            moveAI(array);
          } else {
            setWinner(w);
            changeGameWon(true);
          }
        }
      }

  return (
      <div className = 'App'><h1 className = 'hello'>Hello,
      World!
      </h1>
      <div className = 'board'>{board.map((square, index) => 
        (<div key={index} onClick={() => clicked(index)} className = 'square'>
          <h3>{square}</h3>
      </div>))}
      </div><h1 className = 'ending'>{
          winner == 'tie' ?
              'Pass on what you have learned' :
              gameWon ? `${winner} has won!` : 'Do or do not, there is no try'}<
          /h1>
                      
    </div>);
}

export default App;
