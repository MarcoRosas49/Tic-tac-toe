import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {

    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo

      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    if (!boardToCheck.includes(null)) {
      return false; // Devolver false para indicar empate
    }

    return null
  }

  //revisamos si no hay empate y si no hya espacios vacios
  export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }