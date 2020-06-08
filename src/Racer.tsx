import React from 'react';

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

const Racer: React.FunctionComponent<{ details: IRacers, trackLen: number }> = (props) => {

  const racerStyle = {
    marginLeft: `${props.details.position.css}%`
  };

  const racerStatus = (): string => {
    if (!props.details.canRace && props.trackLen > props.details.position.world) {
      return "OUT";
    } else if (!props.details.canRace && props.trackLen <= props.details.position.world) {
      return "finished";
    } else {
      return "in race";
    }
  }

  return (
    <div
      // onClick={makeAlert}
      className="racerContainer"
      style={racerStyle}>

      <p>{
        props.details.carNitro.inUse ? "NITRO" : ""
      }</p>

      <p>{racerStatus()}</p>

      <p>
        {props.details.name || "-no racer name-"}
      </p>

    </div>
  )

}

export default Racer;