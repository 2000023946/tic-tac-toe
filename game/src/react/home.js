import '../styles/home.css'


import { useState, useEffect } from 'react';

export default function Home(props){


    useEffect(() =>{
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/algo/');

        socket.onopen = (event) =>{
            console.log(event)
        }

        socket.onmessage = (event) =>{
            console.log(event)
        }

        socket.onclose = (event) =>{
            console.log(event)
        }

        socket.onerror = (event) =>{
            console.log(event)
        }

        props.setSocket(socket);

    }, [])

    const sendMessage = (data) =>{
        props.socket.send(JSON.stringify(data))
    }

      

    const handleClick = (event) =>{
        props.setPage('gameboard')
        const playerSign = event.target.dataset['sign']
        props.setSign(playerSign)
        let antiSign = ''
        if (props.sign === 'X'){
            antiSign = 'O'
        }else{
            antiSign = 'X'
        }
        props.setAntiSign(antiSign)
        console.log(props)
        // sendMessage({'sign': antiSign, 'isYourTurn': props.getTurn(props.gameBoard), 'gameBoard':props.gameBoard})
    }

    return(
        <div className="home">
            <div className="home-container">
                <div className="home-title-section">
                    <div className="home-title-container">Play Tic-Tac-Toe</div>
                </div>
                <div className="home-body">
                    <div className="home-begin-message-container">
                        <div>To begin.</div>
                        <div>Choose X or O</div>
                    </div>
                </div>
                <div className="home-image-container">
                    <div className="home-O-image-container" onClick={(event) => handleClick(event)}>
                        <img data-sign='O' id="home-o-image" src='o.png' alt="O sign"/>
                    </div>
                    <div className="home-X-image-container" onClick={(event) => handleClick(event)}>
                        <img data-sign='X' id="home-x-image" src='x.png' alt="X sign"/>
                    </div>
                </div>
            </div>
        </div>
    )
}