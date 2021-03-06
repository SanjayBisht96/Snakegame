import React from 'react'
import {FIELD_SIZE, CELL_SIZE_PX, CELL_MARGIN_PX} from '../../../consts/const'
import "./Grid.css";
import Cell from './Cell/cell';
import { connect } from 'react-redux';

export class Grid extends React.Component{



	render(){
			
			let cells = [];
			for (let x=0 ;x< FIELD_SIZE;x++){
				for(let y=0;y<FIELD_SIZE;y++){
					cells.push(<Cell x={x} y={y} />);
					}
			}
			let board = "container";
			const sizePx = (CELL_SIZE_PX + CELL_MARGIN_PX) * FIELD_SIZE + CELL_MARGIN_PX;
	return (
		<div className={board} style={{
			height:sizePx,
			width:sizePx
			}}
		>
		{cells}
		</div>
			);
	}
}


function mapStateToProps(state){

	return{
		cells : state.game.get("cells")
	}
}


export default connect(
    mapStateToProps,
    {},
)(Grid);