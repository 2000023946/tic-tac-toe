
import '../styles/App.css'

import Home from './home.js'
import GameBoard from './gameboard.js';

import { useState } from 'react';

function App() {

  const [page, setPage] = useState('home')

  const [sign, setSign] = useState('')


  const [socket, setSocket] = useState(undefined)

  const [antiSign, setAntiSign] = useState(undefined)

  const [gameBoard, setGameBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']])

  const data = {
    'page':page,
    'setPage':setPage,
    'sign': sign,
    'setSign': setSign,
    'isYourTurn': (playerSign, gameBoard) => isYourTurn(playerSign, gameBoard),
    'socket': socket,
    'setSocket': setSocket,
    'antiSign': antiSign,
    'setAntiSign': setAntiSign,
    'gameBoard': gameBoard,
    'setGameBoard': setGameBoard,
  }

  function isYourTurn(playerSign, gameBoard){
    let countX = 0
    let countO = 0
    gameBoard.forEach((row) =>{
        row.forEach((cell) =>{
            if (cell === 'X') countX ++;
            else if (cell === 'O') countO++;
        })
    })
    if (countX === countO){
        if (playerSign === 'X') return true;
        else return false
    }
    else if (countX > countO){
        if (playerSign === 'X') return false
        else return true
    }
  }

  return (
    <div className="App" >
      {page === 'home' && <Home {...data}/>}
      {page === 'gameboard' && <GameBoard {...data}/>}
    </div>
  );
}

export default App;
