import React from 'react'
import {connect} from 'react-redux'
import Grid from './Grid/Grid.js'
import './GameBoard.css'
import Overlay from './Overlay/overlay.js';
import { DIRECTION } from '../../consts/const';
import { gameTick, pauseGame, restartGame, setDirection } from '../../Lib/modules/game/actions';


export class GameBoard extends React.Component{
    

    gameTickTimeoutId = null;


    doGameTick = ({ startReadiness = false } = {}) => {

        if (this.gameTickTimeoutId) {
            clearTimeout(this.gameTickTimeoutId);
        }

        const { level } = this.props;

        let tickTimeout = 200 - level * (6 - level / 10);

        // If we need time to prepare
        if (startReadiness) {
            tickTimeout = 1000;
        }

        this.gameTickTimeoutId = setTimeout(this.doGameTick, tickTimeout);

        if (startReadiness) {
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
        this.doGameTick();
    };

    setDirection = direction => {
        const { level, pause, setDirection } = this.props;
        if (level !== null && !pause) {
            setDirection(direction);
        }
    };

    removeKeys = () => {
        document.removeEventListener('keydown');
    };
    
    addKeys = () => {
            document.addEventListener('keydown', (e) => {
                switch(e.keyCode){
                case 38:{ 
                this.setDirection(DIRECTION.TOP);
                break;
                }
                case 39:{ 
                    this.setDirection(DIRECTION.RIGHT);
                    break;
                }
                case 40:{ 
                    this.setDirection(DIRECTION.BOTTOM);
                    break;
                }
                case 37:{ 
                    this.setDirection(DIRECTION.LEFT);
                    break;
                }
                case 32:{ 
                    const { level, restartGame, pauseGame, pause, gameOver } = this.props;
                    if (level === null || gameOver) {
                        restartGame();
                    } else {
                        pauseGame(!pause);
                    }
                    break;
                }    
            default:
            }   
            });
    };

    componentDidMount() {
        this.addKeys();
    } 

    componentWillUnmount() {
        this.stopGame();
        this.removeKeys();
    }


    componentDidUpdate(prevProps) {
        if (
            //start game
            (!prevProps.level && this.props.level) ||
            (prevProps.gameOver && !this.props.gameOver)
        ) {
            this.doGameTick({ startReadiness: true });
        }
        //On crash
        if (this.props.lives < prevProps.lives && !this.props.gameOver) {
            this.doGameTick({ startReadiness: true });
        }
        //On Gameover
        if (!prevProps.gameOver && this.props.gameOver) {
            this.stopGame();
        }
        //On pause
        if (!prevProps.pause && this.props.pause) {

            this.stopGame();
        }
        //On game is resumed
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
                             SPACE 
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