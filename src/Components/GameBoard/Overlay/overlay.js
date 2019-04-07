import React from 'react';
import PropTypes from 'prop-types';
import './overlay.css';

export default class Overlay extends React.Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        label: PropTypes.node.isRequired,
        blink: PropTypes.bool,
    };

    render() {
        const { active, label} = this.props;
        if (!active) {
            return null;
        }

        return (
            <div className="screen">
                <div className={label + " label_overlay"}>{label}</div>
            </div>
        );
    }
}