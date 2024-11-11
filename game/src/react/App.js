
import '../styles/App.css'

import Home from './home.js'
import GameBoard from './gameboard.js';

import { useState } from 'react';

function App() {

  const [page, setPage] = useState('home')

  const [sign, setSign] = useState('')

  const [opacity, setOpacity] = useState(1)

  const [msg, setMsg] = useState('')

  const [socket, setSocket] = useState(undefined)

  const [antiSign, setAntiSign] = useState(undefined)

  const [gameBoard, setGameBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']])

  const data = {
    'page':page,
    'setPage':setPage,
    'sign': sign,
    'setSign': setSign,
    'getTurn': getTurn,
    'socket': socket,
    'setSocket': setSocket,
    'antiSign': antiSign,
    'setAntiSign': setAntiSign,
    'gameBoard': gameBoard,
    'setGameBoard': setGameBoard,
    'opacity':opacity,
    'setOpacity': setOpacity,
    'msg':msg,
    'setMsg':setMsg,
  }

  function getTurn(gameBoard){
    let countX = 0
    let countO = 0
    console.log(gameBoard)
    gameBoard.forEach((row) =>{
        row.forEach((cell) =>{
            if (cell === 'X') countX ++;
            else if (cell === 'O') countO++;
        })
    })
    if (countX > countO){
      return 'O'
    }
    return 'X'
  }

  return (
    <div className="App" style={{'backgroundColor' : `rgba(28, 210, 28, ${opacity})`}}>
      {page === 'home' && <Home {...data} />}
      {page === 'gameboard' && <GameBoard {...data} />}
    </div>
  );
}

export default App;
