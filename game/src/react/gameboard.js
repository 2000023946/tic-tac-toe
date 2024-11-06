
import '../styles/gameboard.css'

import Image from './image.js'

import {useState, useEffect} from 'react'


export default function GameBoard(props){


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
            console.log(grid,'grid')
            const newElement = <Image {...{'url':`${data.sign}.png`}}/>
            setGrid((oldGrid) =>{
                return oldGrid.map((element) =>{
                    const {x,y}= element.props.id

                    console.log(x,y,data.move)
                    if (data.move[0] === x &&  data.move[1] === y){
                        console.log('equal')
                        return(
                            <div 
                                {...{'id':element.props.id}} className="game-grid" key={element.props.id} 
                                onClick={handleClick}>
                                    <Image {...{'url':`${data.sign}.png`}}/>
                            </div>
                        )
                    }
                    return element
                })
            })
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




    const [msg, setMsg] = useState('')

    const handleClick = (event)=>{
        console.log(msg)
        console.log(grid)
        console.log(props.isYourTurn(props.sign, props.gameBoard))
        console.log(props.gameBoard)
        if (!props.isYourTurn(props.sign, props.gameBoard)){
            return
        }
        console.log(event.target)
        const newElement = <Image {...{'url':`${props.sign}.png`}}/>
        console.log(newElement)


        setGrid ((oldValue) =>{
            return oldValue.map((element) =>{
                console.log(element.props.id, event.target.id, event.target.children)
                if(element.props.id == event.target.id && event.target.children.length === 0){
                    console.log('found')
                    return(
                        <div 
                            {...{'id':element.props.id}} className="game-grid" key={element.props.id} 
                            onClick={handleClick}>
                                <Image {...{'url':`${props.sign}.png`}}/>
                        </div>
                    )
                }
                return element
            })
        }) 

        console.log(grid)
    }


    const sendMessage = (data) =>{
        props.socket.send(JSON.stringify(data))
    }

    class Position{
        constructor(x, y){
            this.x = x
            this.y = y
        }

        toString(){
            return `Pos(${this.x}, ${this.y})`
        }
    }
    

    const [grid, setGrid] = useState(
        [
            new Position(0, 0),  new Position(0, 1), new Position(0, 2), 
            new Position(1, 0), new Position(1, 1), new Position(1, 2), 
            new Position(2, 0), new Position(2, 1), new Position(2, 2),
        ].map((value)=>{
        return (
            <div 
                {...{'id':value}} className="game-grid" key={value} 
                onClick={handleClick}>
            </div>
        )
    }))

    useEffect(() =>{
        setGrid ((oldValue) =>{
            return oldValue.map((element) =>{
                return (
                    <div 
                        {...{'id':element.props.id}} className="game-grid" key={element.props.id} 
                        onClick={handleClick}>
                    </div>
                )
            })
        }) 
    }, [])

    console.log(grid)

    console.log(props)

    return(
        <div className='game-section'>
            <div className='game-header'>
                <div className='game-header-title'>
                    {props.isYourTurn(props.sign, props.gameBoard)  &&`Player ${props.sign} Turn`}
                    {!props.isYourTurn(props.sign, props.gameBoard) && `Player ${props.antiSign} Turn`}
                </div>
            </div>
            <div className="game">
                {grid}
            </div>
        </div>
    )
}