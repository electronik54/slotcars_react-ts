import React from 'react';
import Racer from './Racer';


interface IRacers {
    readonly name: String
    , readonly maxSpeed: number
    , position: {
        css: number,
        world: number
    }
    , readonly carMake: String
    , readonly carBreakdownChance: number
    , readonly carNitroChance: number
    , canRace: boolean
}


const Track: React.FunctionComponent<{ racers: IRacers[], track: any }> = (props) => {

    return (
        <article>
            <h1>{props.track.name}</h1>
            <article>
                {
                    props.racers.map((racer, index) => <Racer details={racer} key={index}></Racer>)
                }
            </article>
        </article>
    )
}

export default Track;