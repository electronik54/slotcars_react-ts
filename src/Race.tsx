import React from 'react';
import './App.css';
import update from 'immutability-helper';

import Track from './Track'


interface IProps { }

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

interface IState {
  racers: IRacers[]
  , readonly track: {
    length: number
    , name: String
    , laps: number
  }
  , raceTimer: {
    interval: number
  }
}

export default class Race extends React.Component<IProps, IState>{

  private raceTimer!: NodeJS.Timeout;

  constructor(props: IProps) {
    super(props);

    this.state = {
      racers: [
        {
          name: "racer1"
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
          name: "racer2"
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
        , {
          name: "racer3"
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
      ]
      , track: {
        length: 200, name: "RACE1", laps: 2
      }
      , raceTimer: {
        interval: 1000
      }
    }

    this.initilizeRace();

  }


  initilizeRace = (): void => {
    console.log(`race started`);
    this.startRace();
  }

  calculateSpeed = (racer:IRacers):number => {
    
    let speed = Math.floor(Math.random() * (racer.maxSpeed));

    return speed;
  }

  startRace = () => {
    console.log(`<startRace>`)

    this.raceTimer = setInterval(() => {
      this.moveRacers(this.state);
    }, this.state.raceTimer.interval);

  }

  calcCssPosition = (pos: number): number => {
    return ((100 / this.state.track.length * pos) - 20);
  }

  moveRacers = (st: IState): void => {
    console.log(`<moveRacers>`)

    let newState = { ...st }
      , trackLength = st.track.length;

    let arrRacersCanRace = this.getWorkingCars();

    if (arrRacersCanRace.length == 0) {
      //stop race
      this.stopRace();
      console.log(`no valid racers`);
      return;
    }

    newState.racers.forEach((racer, index) => {

      if (!racer.canRace) return;

      racer.position.world += this.calculateSpeed(racer);
      racer.position.css = this.calcCssPosition(racer.position.world);

      console.log(`${racer.name} is at position ${racer.position.world}|css|${racer.position.css}`);

      if (racer.position.world >= trackLength) {

        console.log(`${racer.name} finished`)

        newState = update(this.state, {
          racers: { [index]: { canRace: { $set: false } } }
        });

      }
      this.setState(newState);
    });
  }

  stopRace = () => {
      console.log(`<stopRace>`)
      clearInterval(this.raceTimer);
  }

  getWorkingCars = () => {
    console.log(`<getWorkingCars>`);
    return this.state.racers.filter(racer => racer.position.world < this.state.track.length && racer.canRace);
  }

  render(): JSX.Element {
    return (
      <section className="raceContainer">
        <p>!! APP UNDER CONSTRUCTION !!</p>
        <Track racers={this.state.racers} track={this.state.track}></Track>
      </section>
    );
  }
}
