import '../styles/home.css'


import { useState, useEffect } from 'react';

export default function Home(props){
      

    const handleClick = (event) =>{
        props.setPage('gameboard')
        const playerSign = event.target.dataset['sign']
        props.setSign(playerSign)
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
                    <div className="home-O-image-container" onClick={handleClick}>
                        <img data-sign='O' id="home-o-image" src='o.png' alt="O sign"/>
                    </div>
                    <div className="home-X-image-container" onClick={handleClick}>
                        <img data-sign='X' id="home-x-image" src='x.png' alt="X sign"/>
                    </div>
                </div>
            </div>
        </div>
    )
}