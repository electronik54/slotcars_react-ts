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
  , readonly carNitro: {
    count: number
    , chance: number
    , inUse: boolean
  }
  , canRace: boolean
}


const Track: React.FunctionComponent<{ racers: IRacers[], track: any }> = (props) => {

  return (
    <article>
      <h1>{props.track.name}</h1>
      <article className="track">
        {
          props.racers.map((racer, index) => <Racer details={racer} trackLen={props.track.length} key={index}></Racer>)
        }
      </article>
    </article>
  )
}

export default Track;