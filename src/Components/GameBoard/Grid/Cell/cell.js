import React from 'react';
import { CELL_MARGIN_PX, CELL_SIZE_PX, CELL_TYPES } from '../../../../consts/const';
import './cell.css'
import { connect } from 'react-redux';

export class Cell extends React.Component {


    render() {
        const { x, y, cellType} = this.props;

        let cellClassName="cell ";
        cellClassName +="blankCell ";
        switch (cellType) {
            case CELL_TYPES.BLANK: {
                cellClassName="cell ";
                cellClassName += "blankCell";
                break;
            }
            case CELL_TYPES.SNAKE: {
                cellClassName="cell ";
                cellClassName += "snakeCell";
                break;
            }
            case CELL_TYPES.FRUIT: {
                cellClassName="cell ";
                cellClassName += "fruitCell";
                break;
            }
            default:
        }


        return (
            <div
                className={cellClassName}
                style={{
                    left: CELL_MARGIN_PX + x * (CELL_SIZE_PX + CELL_MARGIN_PX),
                    top: CELL_MARGIN_PX + y * (CELL_SIZE_PX + CELL_MARGIN_PX),
                    width: CELL_SIZE_PX,
                    height: CELL_SIZE_PX,
                }}
            />
        );
    }
}



function mapStateToProps(state, ownProps) {
const {y,x} = ownProps;

    return {
        cellType : state.game.getIn(['cells', y,x ]),
    };
}

export default connect(
    mapStateToProps,{}
)(Cell);
