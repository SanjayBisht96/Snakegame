import React from 'react'
import ScoreBoard from '../Components/ScoreBoard/ScoreBoard'
import GameBoard from '../Components/GameBoard/GameBoard'


export class Game extends React.Component{
	 render(){
	 	const {store} = this.props;
	 	return( 
		<div>
	 		<ScoreBoard/>
	 		<GameBoard/>
	 	</div>
	 	);
	 }
}

export default Game;
