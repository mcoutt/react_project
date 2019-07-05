import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import { SwapiServiceProvider } from "../swapi-service-context";
import ItemDetails, { Record } from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';


export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
  }

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header/>

            <PersonDetails itemId={11}/>

            <PlanetDetails itemId={5}/>

            <StarshipDetails itemId={9}/>

            <PersonList/>

            <StarshipList/>

            <PlanetList/>
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    )
  }
}
