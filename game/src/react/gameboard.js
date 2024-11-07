
import '../styles/gameboard.css'

import Image from './image.js'

import {useState, useEffect} from 'react'



export default function GameBoard(props){

    const [msg, setMsg] = useState('')

    useEffect(() =>{
        console.log(props.socket, 'socket')
        const socket = props.socket;

        socket.onopen = (event) =>{
            console.log(event)
        }

        socket.onmessage = (event) =>{
            console.log(event)
            const data = JSON.parse(event.data)
            console.log(data)
            props.setGameBoard(data.gameBoard)
            console.log(props)
            setMsg(data.gameBoard)
        }

        socket.onclose = (event) =>{
            console.log(event)
        }

        socket.onerror = (event) =>{
            console.log(event)
        }

        props.setSocket(socket);

        
    },[] )


    function handleClick(i, j){
        // console.log(msg)
        // console.log(props.isYourTurn(props.sign, props.gameBoard))
        // console.log(props.gameBoard)
        console.log(i, j)

        console.log(props.getTurn(props.gameBoard))
        if (props.getTurn(props.gameBoard)){
            console.log(i, j)
            const newGrid = [['', '', ''], ['', '', ''], ['', '', '']]
            props.gameBoard.forEach((row, m) =>{
                row.forEach((cell, n) =>{
                    newGrid[m][n] = cell
                }) 
            })
            newGrid[i][j] = props.sign
            props.setGameBoard(newGrid)
        }

        console.log(props)

        // console.log(event.target)
        // const newElement = <Image {...{'url':`${props.sign}.png`}}/>
        // console.log(newElement)


        // props.setGameBoard((oldValue) =>{
            
        // }) 

        // console.log(grid)
    }


    const sendMessage = (data) =>{
        props.socket.send(JSON.stringify(data))
    }

    

    // console.log(grid)

    // console.log(props)

    // const log = () =>{
    //     console.log(props)
    // }


    return(
        <div className='game-section'>
            <div className='game-header'>
                <div className='game-header-title'>
                    {`Player ${props.getTurn(props.gameBoard)} Turn`}
                </div>
            </div>
            <div className="game" >
                {
                    props.gameBoard.map((row, i)=>{
                        return row.map((value, j) =>{
                            return (
                                <div 
                                    className="game-grid" key={`${i,j}`} onClick={() => handleClick(i, j)}>
                                </div>
                            )
                        })
                    })
                }
            </div>
        </div>
    )
}
