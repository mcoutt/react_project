import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";


export default class ShipDetails extends Component {

  swapiService = new SwapiService();

  state = {
    ship: null
  };

  componentDidMount() {
    this.updateShip();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.shipId !== prevProps.shipId) {
      this.updateShip()
    }
  }

  updateShip() {
    const { shipId } = this.props;
    if (!shipId) {
      return;
    }

    this.swapiService
      .getStarship(shipId)
      .then((ship) => {
        this.setState({ship})
      })
      .catch((err) => console.log(err))
  }

  render() {

    if (!this.state.ship) {
      return <Spinner/>
    }

    if (!this.state.ship) {
      return <span>select a ship from list</span>
    }

    const { id, name, model, manufacturer, MGLT } = this.state.ship;

    return(
      <div className="person-details card">
        <img className="person-image"
             src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
             alt="ship-details"/>
        <div className="card-body">
          <h4>{name} {this.props.shipId} </h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">model</span>
              <span>{model}</span>
            </li>
            <li className="list-group-item">
              <span className="term">manufacturer</span>
              <span>{manufacturer}</span>
            </li>
            <li className="list-group-item">
              <span className="term">MGLT</span>
              <span>{MGLT}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
