import React from 'react'
import {connect} from 'react-redux'
import Grid from './Grid/Grid.js'
import './GameBoard.css'
import Overlay from './Overlay/overlay.js';
import { DIRECTION } from '../../consts/const';
import { gameTick, pauseGame, restartGame, setDirection } from '../../Lib/modules/game/actions';


const { key } = window;

export class GameBoard extends React.Component{
    

    gameTickTimeoutId = null;


    doGameTick = ({ skipTick = false, startReadiness = false } = {}) => {
        if (startReadiness) {
            this.setState({
                showWaitCircle: true,
            });
        } else if (this.state.showWaitCircle) {
            this.setState({
                showWaitCircle: false,
            });
        }

        if (this.gameTickTimeoutId) {
            clearTimeout(this.gameTickTimeoutId);
        }

        const { level } = this.props;

        let tickTimeout = 120 - level * (5 - level / 10);

        // If we need time to prepare
        if (startReadiness) {
            tickTimeout = 1000;
        }

        this.gameTickTimeoutId = setTimeout(this.doGameTick, tickTimeout);

        if (skipTick || startReadiness) {
            return;
        }

        const { gameTick } = this.props;
        gameTick()
    };

    stopGame = () => {
        if (this.gameTickTimeoutId) {
            clearTimeout(this.gameTickTimeoutId);
        }
    };

    resumeGame = () => {
        this.doGameTick({ skipTick: true });
    };

    setDirection = direction => {
        const { level, pause, setDirection } = this.props;
        if (level !== null && !pause) {
            setDirection(direction);
        }
    };

    unBindKeys = () => {
        key.unbind('top');
        key.unbind('right');
        key.unbind('bottom');
        key.unbind('left');
        key.unbind('space');
    };
    
    bindKeys = () => {
            key('up', () => {
                this.setDirection(DIRECTION.TOP);
            });
    
            key('right', () => {
                this.setDirection(DIRECTION.RIGHT);
            });
    
            key('down', () => {
                this.setDirection(DIRECTION.BOTTOM);
            });
    
            key('left', () => {
                this.setDirection(DIRECTION.LEFT);
            });
    
            key('space', () => {
                const { level, restartGame, pauseGame, pause, gameOver } = this.props;
                if (level === null || gameOver) {
                    restartGame();
                } else {
                    pauseGame(!pause);
                }
            });
        

    }
    
    componentDidMount() {
        this.bindKeys();
    } 

    componentWillUnmount() {
        this.stopGame();
        this.unBindKeys();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            // If game beginning
            (!prevProps.level && this.props.level) ||
            // Or restart after game over
            // Или рестарт после гамовера
            (prevProps.gameOver && !this.props.gameOver)
        ) {
            this.doGameTick({ startReadiness: true });
        }

        if (this.props.lives < prevProps.lives && !this.props.gameOver) {
            this.doGameTick({ startReadiness: true });
        }

        if (!prevProps.gameOver && this.props.gameOver) {
            this.stopGame();
        }

        if (!prevProps.pause && this.props.pause) {
            this.stopGame();
        }

        if (prevProps.pause && !this.props.pause) {
            this.resumeGame();
        }
    }
    
    
    render(){
	 	const { pause, gameOver, level} = this.props;
	 	return( 
	 	<div className="gameboard">
	 		<Grid/>
             <Overlay
                    active={level === null}
                    label={
                        <div>
                            Press
                            <br />
                            &lt; SPACE &gt;
                            <br />
                            to start
                        </div>
                    }
                />
        	<Overlay active={pause} label="Pause" />
            <Overlay active={gameOver} label="Game Over" /> 
	 	</div>
	 	);
	 }
}

//export default GameBoard;


function mapStateToProps(state, ownProps) {
    return {
        pause: state.game.get('pause'),
        gameOver: state.game.get('gameOver'),
        level: state.game.get('level'),
        lives: state.game.get('lives'),
    };
}

export default connect(
    mapStateToProps,
    {
        restartGame,
        pauseGame,
        setDirection,
        gameTick
    },
)(GameBoard);