import React, {Component} from "react";

import './people-page.css';
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";


export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 13,
    hasError: false
  };

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
        getData={this.swapiService.getAllPeople}>
        {(i) => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson}/>
      </ErrorBoundry>
    );
    return (
        <Row left={itemList} right={itemDetails}/>
    )

  }
}
