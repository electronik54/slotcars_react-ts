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
  , readonly carNitro: {
    count: number
    , chance: number
    , inUse: boolean
  }
  , canRace: boolean
}

interface IState {
  racers: IRacers[]
  , readonly race: {
    length: number
    , name: String
    , laps: number
    , winner: string[]
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
          name: ""
          , maxSpeed: 50
          , position: {
            css: 0,
            world: 0
          }
          , carMake: ""
          , carBreakdownChance: 0.01
          , carNitro: {
            count: 1
            , chance: 1
            , inUse: false
          }
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
          , carBreakdownChance: 0.08
          , carNitro: {
            count: 1
            , chance: 1
            , inUse: false
          }
          , canRace: true
        }
      ]
      , race: {
        length: 200
        , name: "RACE1"
        , laps: 2
        , winner: []
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

  calculateSpeed = (racer: IRacers): number => {

    let speed = Math.floor(Math.random() * (racer.maxSpeed));

    if (racer.carNitro.count > 0) {

      if (Math.random() < racer.carNitro.chance) {

        racer.carNitro.chance -= 1;
        console.log(`%c${racer.name || "-no name-"} used nitro`, 'color: blue');
        speed += (racer.maxSpeed / 2);

        racer.carNitro.inUse = true;
      } else {
        racer.carNitro.inUse = false;
      }

    }

    return speed;
  }

  setBrokenRacer = (racer: IRacers): boolean => {
    if (Math.random() < racer.carBreakdownChance) {
      console.log(`%c${racer.name || "-no name-"} cant race`, 'color:red')
      racer.canRace = false;
      return false;
    }
    return true;
  }

  startRace = () => {
    console.log(`<startRace>`);

    this.raceTimer = setInterval(() => {
      this.moveRacers(this.state);
    }, this.state.raceTimer.interval);

  }

  calcCssPosition = (pos: number): number => {
    return ((100 / this.state.race.length * pos) - 20);
  }

  moveRacers = (st: IState): void => {
    console.log(`<moveRacers>`)

    let newState = { ...st }
      , trackLength = st.race.length
      , arrRacersCanRace = this.getWorkingCars();

    if (arrRacersCanRace.length == 0) {
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

        console.log(`%c${racer.name || "-no name-"} finished`, 'color:green')

        newState = update(this.state, {
          racers: { [index]: { canRace: { $set: false } } }
          , race: { winner: { $push: [`${racer.name || '-no name-'}`] } }
        });

      }
      this.setBrokenRacer(racer); // move this to top
      this.setState(newState);
    });

  }

  stopRace = () => {
    console.log(`<stopRace>`)
    clearInterval(this.raceTimer);
    if (this.state.race.winner.length > 0) {
      console.log('%cWINNERS ARE', 'color:green; font-weight:bold');
      console.table(this.state.race.winner);
    }
  }

  getWorkingCars = () => {
    console.log(`<getWorkingCars>`);
    return this.state.racers.filter(racer => racer.position.world < this.state.race.length && racer.canRace);
  }

  render(): JSX.Element {
    return (
      <section className="raceContainer">
        <p>!! APP UNDER CONSTRUCTION !!</p>
        <Track racers={this.state.racers} track={this.state.race}></Track>
      </section>
    );
  }
}
