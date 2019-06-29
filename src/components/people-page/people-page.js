import React, {Component} from "react";

import './people-page.css';
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import SwapiService from "../../services/swapi-service";

const Row = ({ left, right }) => {
  return (
    <div>
      <div className="row mb2">
        <div className="col-md-6">
          {left}
        </div>
        <div className="col-md-6">
          {right}
        </div>
      </div>

    </div>
  );
};

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 13,
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson
    })
  };


  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}/>
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson}/>
    );
    return (
      <Row left={itemList} right={personDetails}/>
    )

  }
}
