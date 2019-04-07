import React from 'react'
import {connect} from 'react-redux'

import Lives from './Lives/Lives'
import Level from './Level/Level'
import Score from './Score/Score'
import './ScoreBoard.css' 

export class ScoreBoard extends React.Component{
	 render(){
	 	const {score, level, lives} = this.props;
	 	return( 
	 	<div className="scoreboard">
		 <Lives value={lives} max={3}/>
		 <Level value={level}/>
		 <Score value={score}/>
	 	</div>
	 	);
	 }
}

function mapStateToProps(state, ownProps) {
    return {
        score: state.game.get('score'),
        level: state.game.get('level'),
        lives: state.game.get('lives'),
    };
}


export default connect( 
	mapStateToProps,
)(ScoreBoard);