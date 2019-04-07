import React from 'react'
import './Lives.css'
import HeartEmpty from './HeartEmpty'
import HeartFull from './HeartFull'

export class Lives extends React.Component{
    render() {
        const { max, value } = this.props;

        const hearts = [];
        for (let i = 0; i < max; i += 1) {
            if (i < value) {
                hearts.push(<HeartFull className="heart" />);
            } else {
                hearts.push(<HeartEmpty className="heart" />);
            }
        }

        return (
            <div className="lives">
                <div className="label">Lives:</div>
                <div className="hearts">{hearts}</div>
            </div>
        );
    }}

export default Lives;