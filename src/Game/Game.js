import React from 'react'
import ScoreBoard from '../Components/ScoreBoard/ScoreBoard'
import GameBoard from '../Components/GameBoard/GameBoard'
import './Game.css'


export class Game extends React.Component{
	 render(){

	 	return( 
		<div className="game">
			<div className="column" ></div>
	 		<div className="column game-container">
			 <ScoreBoard/>
	 		<GameBoard/>
			</div>
			<div className="column" ></div>
	 	</div>
	 	);
	 }
}

export default Game;
