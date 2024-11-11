import '../styles/result.css'

import { useState } from 'react'

export default function Result(props){

    const handleClick = () =>{
        props.setMsg('')
        props.setOpacity(1)
        props.setGameBoard([['', '', ''], ['', '', ''], ['', '', '']])
        props.setPage('home')
    }

    return(
        <div className="result">
            <div className="result-title">
                Game Over!
            </div>
            <div className="result-header">
                {props.msg}
            </div>
            <div className="result-body">
                <div className="result-button" onClick={handleClick}>
                    Play Again
                </div>
            </div>
        </div>
    )
}