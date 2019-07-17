import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface Props { }
interface State {
  racers: {
    name: String
    , maxSpeed: Number
    , position: Number | null
    , carMake: String
    , carBreakdownChance: Number
    , carNitroChance: Number
  }[]
  , track: {
    length: Number
    , name: String
    , laps: number
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
          , position: 10
          , carMake: ""
          , carBreakdownChance: 0
          , carNitroChance: 0
        }
        , {
          name: ""
          , maxSpeed: 0
          , position: 10
          , carMake: ""
          , carBreakdownChance: 0
          , carNitroChance: 0
        }
      ]
      , track: {
        length: 3000, name: "", laps: 2
      }
    }


  }

  startRace = () => {

  }


  render() {

    return (
      <section>
        <h1></h1>
      </section>

    );

  }

}
