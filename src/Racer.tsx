import React from 'react';
import './App.css';
import update from 'immutability-helper';

interface Props { }
interface State {
  racers: {
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
  }[]
  , readonly track: {
    length: number
    , name: String
    , laps: number
  }
  , raceTimer: {
    timer: NodeJS.Timeout | null
    , interval: number
  }
}

export default class Racer extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);


    this.state = {    //HOW TO ASSIGN <State> datatype here?
      racers: [
        {
          name: ""
          , maxSpeed: 0
          , position: {
            css: 0,
            world: 0
          }
          , carMake: ""
          , carBreakdownChance: 0
          , carNitroChance: 0
          , canRace: true
        }
        , {
          name: ""
          , maxSpeed: 0
          , position: {
            css: 0,
            world: 0
          }
          , carMake: ""
          , carBreakdownChance: 0
          , carNitroChance: 0
          , canRace: true
        }
      ]
      , track: {
        length: 3000, name: "", laps: 2
      }
      , raceTimer: {
        timer: null
        , interval: 1000
      }
    }

    this.initilizeRace();

  }


  initilizeRace = (): void => {
    console.log(`race started`);
    this.startRace();
  }

  startRace = () => {

    let tm = setInterval(() => {
      this.moveRacers(this.state);
    }, this.state.raceTimer.interval);

    debugger
    const raceTimer = update(this.state, {
      raceTimer: {timer: { $set: tm }}
    });
    this.setState(
      raceTimer
    );

  }

  moveRacers = (st: State): void => {

    let racers = [...st.racers]
      , trackLength = st.track.length;

    // racers[0].name == "sdf";
    racers.forEach((racer, index) => {

      debugger
      racer.position.world += racer.maxSpeed;
      if (racer.position.world >= trackLength) {
        const canRace = update(this.state.racers, {
          index: { canRace: { $set: false } } ,
        });

        this.setState({
          racers: canRace
        });
      }
    });

  }


  render(): JSX.Element {

    const racer1Style = {
      marginLeft: `${this.state.racers[0].position.css}%`
    };

    return (

      <section className="raceContainer">
        <h1>{this.state.track.name}</h1>

        <article>
          <div className="racerContainer" style={racer1Style}>racer1</div>
          <div className="racerContainer" style={racer1Style}>racer2</div>
          <div className="racerContainer" style={racer1Style}>racer3</div>
        </article>


      </section>

    );

  }

}
