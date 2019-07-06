import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import './app.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";
import {
  PeoplePage,
  PlanetPage,
  StarshipsPage,
  LoginPage,
  SecretPage } from "../pages";

export default class App extends Component {

  state = {
    swapiService: new DummySwapiService(),
    isLoggedIn: false

  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;

      return  {
        swapiService: new Service()
      }
    })
  };

  render() {

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>

              <RandomPlanet/>

              <Switch>
                <Route
                  path="/"
                  render={() => <h4>Welcome...</h4>}
                  exact/>
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets" component={PlanetPage}/>
                <Route path="/starships" exact component={StarshipsPage}/>
                <Route path="/starships/:id"
                       render={({match}) => {
                         const {id} = match.params;
                         return <StarshipDetails itemId={id}/>
                       }}/>

                <Route
                  path="/login"
                  render={() => (
                    <LoginPage
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin}/>
                  )}/>

                <Route
                  path="/secret"
                  render={() => (
                    <SecretPage isLoggedIn={isLoggedIn}/>
                  )}/>

                <Route render={() => <h4> page not found..</h4>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    )
  }
}
