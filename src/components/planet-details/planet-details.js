import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";


export default class PlanetDetails extends Component {

    swapiService = new SwapiService();

    state = {
        planet: null
    };

    componentDidMount() {
        this.updatePlanet();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.planetId !== prevProps.planetId) {
            this.updatePlanet()
        }
    }

    updatePlanet() {
        const { planetId } = this.props;
        if (!planetId) {
            return;
        }

        this.swapiService
          .getPlanet(planetId)
          .then((planet) => {
              this.setState({planet})
          })
          .catch((err) => console.log(err))
    }

    render() {

        if (!this.state.planet) {
            return <Spinner/>
        }

        if (!this.state.planet) {
            return <span>select a planet from list</span>
        }

        const { id, name, population, rotationPeriod, diameter } = this.state.planet;

        return(
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                     alt="planet-details"/>
                <div className="card-body">
                    <h4>{name} {this.props.planetId} </h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span>{population}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation Period</span>
                            <span>{rotationPeriod}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span>{diameter}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
