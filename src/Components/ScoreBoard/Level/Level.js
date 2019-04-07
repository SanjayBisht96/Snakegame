import React from 'react'
import './Level.css'

export class Level extends React.Component{
    render() {
        const {value } = this.props;

        return (
            <div className="level">
                <div className="label">Level:{value}</div>
            </div>
        );
    }
}

export default Level;