import React from 'react';
import './App.css';
import update from 'immutability-helper';
import { number } from 'prop-types';

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
    timer: ReturnType<typeof setTimeout> | null
    , interval: number
  }
}

export default class Racer extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);


    this.state = {    //HOW TO ASSIGN <State> datatype here?
      racers: [
        {
          name: "race1"
          , maxSpeed: 50
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
          name: "race2"
          , maxSpeed: 40
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
        length: 200, name: "", laps: 2
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

    const raceTimer = update(this.state, {
      raceTimer: { timer: { $set: tm } }
    });
    this.setState(
      raceTimer
    );

  }

  calcCssPosition = (pos: number): number => {
    return ((100 / this.state.track.length * pos)-20);
  }

  moveRacers = (st: State): void => {

    let newState = { ...st }
      , trackLength = st.track.length;

    // racers[0].name == "sdf";
    newState.racers.forEach((racer, index) => {

      if (!racer.canRace) return;

      racer.position.world += racer.maxSpeed;
      racer.position.css = this.calcCssPosition(racer.position.world);

      if (racer.position.world >= trackLength) {

        console.log(`${racer.name} finished`)

        // const canRace = update(this.state.racers, {
        //   index: { canRace: { $set: false } },
        // });

        // this.setState({
        //   racers: canRace
        // });

        newState = update(this.state, {
          racers: { [index]: { canRace: { $set: false } } }
        });

      }
      this.setState(newState);
    });

  }


  render(): JSX.Element {

    const racer1Style = {
      marginLeft: `${this.state.racers[0].position.css}%`
    };
    const racer2Style = {
      marginLeft: `${this.state.racers[1].position.css}%`
    };

    return (

      <section className="raceContainer">
        <h1>{this.state.track.name}</h1>

        <article>
          <div className="racerContainer" style={racer1Style}>racer1</div>
          <div className="racerContainer" style={racer2Style}>racer2</div>
        </article>


      </section>

    );

  }

}
