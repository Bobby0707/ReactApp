import React from 'react';
import Autocomplete from './Autocomplete';
import {DebounceInput} from 'react-debounce-input';
require('es6-promise').polyfill();
require('isomorphic-fetch');


export default class PickupWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      options: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});

    const endpoint = `https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${e.target.value}`

    if (e.target.value.length > 1) {
      fetch(endpoint)
      .then(results => {
        return results.json();
      }).then(data => {

        const finalArray = [];

        data.results.docs.forEach((value, index) => {
          finalArray.push({"name": value.name, "locationId": value.locationId, "iata": value.iata, "city": value.city, "country": value.country, "region": value.region, "label": this.handleLabel(value.name)});
        });

        this.setState({options: finalArray});

      }).catch(err => {
        this.setState({options: []});
      })
    }
  }

  handleLabel(name) {
    if (name === 'No results found') return undefined;
    const label = name.split(" ");
    return name.includes('Airport') ? "airport" : name.includes('Station') ? 'station' : 'city';
  }


  render() {
    return (
      <div className="pickup-widget">
        <form 
          className="pickup-widget--form"
          onClick={this.handleSubmit}>
          <h2 className="pickup-widget--title">Where are you going?</h2>
          <label className="pickup-widget--label">
            Pick-up Location
          </label> 
          <DebounceInput
            minLength={1}
            debounceTimeout={0}
            className="pickup-widget--input" 
            type="text" name="name"
            value={this.state.value}
            placeholder="city, airport, station, region, district…" 
            onChange={this.handleChange} 
          />
          
          {this.state.value.length > 1 && <Autocomplete suggestions={this.state.options} /> }
        </form>
      </div>  
    )
  }
}