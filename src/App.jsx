import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [Winner, setWinner] = useState("");

  function writePlayer(index){
    const newBoard = [...board];
    
    if(newBoard[index] === ""){
      setPlayer(player === "X" ? "O" : "X");
      newBoard[index] = player;
      setBoard(newBoard);
    }
  }
  
  function resetGame(){
    setBoard(Array(9).fill(""));
    setWinner("")
  }
  useEffect(() => {
  const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  const isFilled = board.every(items => items !== "");
    if(isFilled === true){
      setWinner("draw");
      return;
    }

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      setWinner(board[a]);
      break;
    }
  }
}, [board]);
  return (
    <>
      <div className='h-screen w-full flex flex-col items-center justify-center gap-5'>
        <div className='text-4xl text-cyan-700 font-medium text-shadow-cyan-300 font-[--font-display] mb-7 text-shadow-2xs'>Tic Tac Toe</div>
        <div className='text-2xl font-medium text-fuchsia-500'>Player: {player}'s Turn</div>
        <div className=' bg-[#E5E7EB] border-[#9CA3AF] grid grid-cols-3 rounded-xl'>
          {board.map((cell,i) =>(
            <div key={i} className='border-2 border-[#9CA3AF] text-6xl flex justify-center items-center h-25 w-25 font-bold' style={cell === "X" ? {color: "#2563EB"} : {color: "#DC2626"}} onClick={()=> writePlayer(i)}>{cell}</div>
          ))}
        </div>
        <div className='text-3xl font-bold text-pink-500 py-3.5 hidden' style={Winner ? {display:"block"} : {display:"none"}}>{Winner === "draw" ? "Match Draw!" : `Winner is ${Winner}`}</div>
        <button type="reset" className='py-1 px-5 rounded-xl border-gray-400 bg-indigo-500 text-xl text-white cursor-pointer font-medium hidden' style={Winner ? {display:"block"} : {display:"none"}} onClick={resetGame}>Reset</button>
      </div>
    </>
  )
}

export default App
