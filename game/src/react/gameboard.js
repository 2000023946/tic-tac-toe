
import '../styles/gameboard.css'

import Image from './image.js'

import {useState, useEffect} from 'react'



export default function GameBoard(props){

    setTimeout(() =>{

    }, 1000)

    const [socket, setSocket] = useState(new WebSocket('ws://127.0.0.1:8000/ws/algo/'))


    useEffect(() =>{
        console.log(props.socket, 'socket')

        socket.onopen = (event) =>{
            console.log(event)
            console.log(props)
            if (props.sign === 'O'){
                sendMessage({'status':'move', 'sign': props.getTurn(props.gameBoard), 'gameBoard':props.gameBoard})
            }
        }

        socket.onmessage = (event) =>{
            console.log(event)
            const data = JSON.parse(event.data)
            console.log(data)
            if (data['status'] === 'move'){
                props.setGameBoard(data['gameBoard'])
            }
        }

        socket.onclose = (event) =>{
            console.log(event)
        }

        socket.onerror = (event) =>{
            console.log(event)
        }

        setSocket(socket);

        return(() =>{
            socket.close()
        })
        
    },[])


    function handleClick(i, j){
        console.log(i, j)
        console.log(props.getTurn(props.gameBoard))
        console.log(props.gameBoard)
        if (props.getTurn(props.gameBoard) === props.sign){
            console.log(i, j)
            const newGrid = [['', '', ''], ['', '', ''], ['', '', '']]
            props.gameBoard.forEach((row, m) =>{
                row.forEach((cell, n) =>{
                    newGrid[m][n] = cell
                }) 
            })
            newGrid[i][j] = props.sign
            props.setGameBoard(newGrid)
            sendMessage({'status':'move', 'sign': props.getTurn(newGrid), 'gameBoard':newGrid})
        }
    }

    const  sendMessage =(data) =>{
        socket.send(JSON.stringify(data))
    }

    const isOver = () =>{
        let count = 0
        props.gameBoard.forEach( (row)=>{
            row.forEach((cell) =>{
                if (cell === 'X' || cell === 'O'){
                    count ++
                }
            })
        })
        return count === 9
    }

    console.log(isOver())



    return(
        <div className='game-section'>
            <div className='game-header'>
                <div className='game-header-title'>
                    {`Player ${props.getTurn(props.gameBoard)} Turn`}
                </div>
            </div>
            <div className="game" >
                { !isOver() &&
                    props.gameBoard.map((row, i)=>{
                        return row.map((value, j) =>{
                            return (
                                <div style={{'fontSize':'120px', 'display':'flex', 'justifyContent':'center', 'alignItems':'center'}}
                                    className="game-grid" key={`${i,j}`} onClick={() => handleClick(i, j)}>
                                    {value}
                                </div>
                            )
                        })
                    })
                }
            </div>
        </div>
    )
}
