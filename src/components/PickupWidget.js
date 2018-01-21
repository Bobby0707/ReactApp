import React from 'react';
import Autocomplete from './Autocomplete';

export default class PickupWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      options: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
    if (e.target.value.length < 2) {
      console.log('no results');
    } else {
      fetch(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${e.target.value}`)
      .then(results => {
        return results.json();
      }).then(data => {
        console.log({options: data.results.docs});
        //this.setState({options: data.results.docs});
      });
    }
  }

  render() {
    return (
      <div className="pickup-widget">
        <form 
          className="pickup-widget__form"
          onClick={this.handleSubmit}>
          <h2 className="pickup-widget__title">Where are you going?</h2>
          <label className="pickup-widget__label">
            Pick-up Location
          </label>  
          <input placeholder="city, airport, station, region, district…" 
                 className="pickup-widget__input" 
                 type="text" name="name"
                 value={this.state.value}
                 onChange={this.handleChange} 
          />
          {this.state.value.length > 1 && <Autocomplete suggestions={this.state.options} /> }
        </form>
      </div>  
    )
  }
}