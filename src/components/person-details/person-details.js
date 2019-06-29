import React, { Component} from "react";

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson()
        }
    }

    updatePerson() {
        const { personId } = this.props;
        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({ person });
            })
            .catch((err) => console.log(err))
    }

    render() {

        if (!this.state.person) {
            return <Spinner/>
        }

        if (!this.state.person) {
            return <span>Select a person a list</span>
        }

        const { id, name, gender, birthYear, eyeColor, skinColor, mass, height, hairColor } = this.state.person;

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                alt="person-details"/>
                <div className="card-body">
                    <h4>{name} {this.props.personId} </h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye color</span>
                            <span>{eyeColor}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Hair color</span>
                            <span>{hairColor}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Skin color</span>
                            <span>{skinColor}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Mass</span>
                            <span>{mass}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Height</span>
                            <span>{height}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
