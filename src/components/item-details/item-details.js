import React, {Component} from "react";
import './item-details.css';
import Spinner from "../spinner/spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  )
};

export {
  Record
}

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem()
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      })
      .catch((err) => console.log(err))
  }

  render() {

    if (!this.state.item) {
      return <Spinner/>
    }

    if (!this.state.item) {
      return <span>Select a item a list</span>
    }

    const { item, image } = this.state;

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
             src={image}
             alt="item-details"/>
        <div className="card-body">
          <h4>{name} {this.props.itemId} </h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child, idx) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton/>
        </div>
      </div>
    )
  }
}
