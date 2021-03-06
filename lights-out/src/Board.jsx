import React, {useState} from "react";
import Cell from "./Cell";
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board(props) {

  // TODO: set initial state
  const [chancesLeft, ChancesLeft] = useState(20)
  function left(){
    ChancesLeft(chancesLeft => chancesLeft-1);
  }
  
  const [ hasWon, setHasWon ] = useState(false)
    function setHasWon1(hasWon){
      setHasWon(hasWon =>hasWon);
    } 
  
  const [board, setBoard] = useState(createBoard())

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < props.nrows; y++) {
		let row = [];
		for (let x = 0; x < props.ncols; x++) {
		  // decide if cell is on/off
		  row.push(Math.random() < props.chanceLightStartsOn);
		}
		board.push(row);
	  }
	return board
  }

  /** handle changing a cell: update board & determine if winner */

  function flipCellsAround(coord) {
    let {ncols, nrows} = props;
    let Board = board;
    let [y, x] = coord.split("-").map(Number);


	function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        Board[y][x] = !Board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y,x)
    flipCell(y-1,x);
    flipCell(y,x+1);
    flipCell(y+1,x);
    flipCell(y,x-1);

	//no. of chancesLeft change
	left();

    // win when every cell is turned off
    let hasWon = board.every((row) =>
			row.every((cell) => {
				return cell === false;
			})
		);
    setHasWon(hasWon);

    //re-render the board after every click
    
  }
    // determine is the game has been won
	function renderCells(){
		let tableBoard = [];
		for (let y = 0; y < props.nrows; y++) {
		  let row = [];
		  for (let x = 0; x < props.ncols; x++) {
			let coord = `${y}-${x}`;
			row.push(
			  <Cell
				key={coord}
				isLit={board[y][x]}
				flipCellsAroundMe={() => flipCellsAround(coord)}
			  />
			);
		  }
		  tableBoard.push(<tr key={y}>{row}</tr>);
		}
		return tableBoard; 
	  }

  /** Render game board or winning message. */

  return (

    // if the game is won, just show a winning msg along with the leaderboard

    // TODO

    // make table board
    // render leaderboard when won or lost
	<div>
	{
	  hasWon? 
		<div>
		  <h1>YOU WON</h1>
		</div>:
		chancesLeft>0?
		<div>
		  <h2>LIGHTS OUT</h2>
		  <table className="Board">
			  <tbody>
			  {renderCells()}
			  </tbody>
		</table>
		<br></br>
		Tries Left: {chancesLeft}
		  </div>:
		  <div>
			<h1>YOU LOST</h1>
		  </div>		
	}
  </div>

    // TODO
  );
}
export default Board;