import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { WinnerPopUp } from './components/WinnerPopUp';

function App() {

  const [board, setBoard] = useState(() => {
    //Iniciando el estado del board
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const[turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ??  TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }


  const updateBoard = (index) => {

    //no actualizamos el tablero si ya esta ocupado
    if(board[index] || winner) return

    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)


    //GUARDAR AQUI PARTIDA
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }

  }
  return (
  <main className='board'>
    <h1>Tic tac toe</h1>
    <button onClick={resetGame}>Reset Game</button>
    <section className="game">
      {
        board.map((_,index) => {
          return(
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })
      }


      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerPopUp resetGame={resetGame} winner={winner}/>

    </section>
  </main>
  
  )
}



export default App
