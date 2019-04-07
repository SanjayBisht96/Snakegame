import React from 'react'
import './Score.css'

export class Score extends React.Component{
    render() {
        const {value} = this.props;

        return (
            <div className="score">
                <div className="label">Score:{value}</div>
            </div>
        );
    }
}

export default Score;