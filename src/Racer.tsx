import React from 'react';

interface det {
    readonly name: String;
    readonly maxSpeed: number;
    position: {
        css: number;
        world: number;
    };
    readonly carMake: String;
    readonly carBreakdownChance: number;
    readonly carNitroChance: number;
    canRace: boolean;
}

const Racer: React.FunctionComponent<{ details: det }> = (props) => {

    const racerStyle = {
        marginLeft: `${props.details.position.css}%`
    };

    return (
        // <div className="racerContainer" style={props.details.position.css}>racer1</div>
        <div className="racerContainer" style={racerStyle}>{props.details.name || "-no racer name-"}</div>
    )
}

export default Racer;