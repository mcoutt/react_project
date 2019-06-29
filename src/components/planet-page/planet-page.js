import React, { Component} from "react";

import './planet-page.css';
import PlanetDetails from "../planet-details";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import SwapiService from "../../services/swapi-service";

export default class PlanetPage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPlanet: 13,
        hasError: false
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        })
    }

    onPlanetSelected = (selectedPlanet) => {
        this.setState( {
            selectedPlanet
        })
    };


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        return (
            <div>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPlanetSelected }
                            getData={this.swapiService.getAllPlanets}
                            renderItem={({name, population, rotationPeriod, diameter}) => `${name} (${population}, ${rotationPeriod}, ${diameter})`}/>

                    </div>
                    <div className="col-md-6">
                        <PlanetDetails planetId={this.state.selectedPlanet} />
                    </div>
                </div>

            </div>
        );
    }
}
