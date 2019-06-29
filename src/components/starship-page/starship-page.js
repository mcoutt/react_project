import React, { Component} from "react";

import './starship-page.css';
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import SwapiService from "../../services/swapi-service";
import ShipDetails from "../starship-details";

export default class StarshipPage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedShip: 13,
        hasError: false
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        })
    }

    onShipSelected = (selectedShip) => {
        this.setState( {
            selectedShip
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
                            onItemSelected={this.onShipSelected }
                            getData={this.swapiService.getAllStarships}
                            renderItem={({name, model, manufacturer, starship_class}) => `${name} (${model}, ${manufacturer}, ${starship_class})`}/>

                    </div>
                    <div className="col-md-6">
                        <ShipDetails shipId={this.state.selectedShip} />
                    </div>
                </div>

            </div>
        );
    }
}
