import React from 'react';

const Autocomplete = props => {

  return (
  <ul className="autocomplete--list">
    {props.suggestions.length ? props.suggestions.map((suggestion, index) => (
      <li key={suggestion.locationId-index}>
        <a href="#">
          {suggestion.label && <span className={`autocomplete--label ${suggestion.label}` }>{suggestion.label}</span>}
          {suggestion.name && suggestion.emindex ? <span> <em> {suggestion.name.substring(0, suggestion.emindex)}</em>{suggestion.name.substring(suggestion.emindex)} </span> : suggestion.name} {suggestion.iata && `(${suggestion.iata})`}
          {suggestion.label === "airport" ? <span className="autocomplete--location">{suggestion.city}, {suggestion.country}</span> 
          : suggestion.label === "station" ? <span className="autocomplete--location">{suggestion.city}, {suggestion.region}, {suggestion.country}</span>
          : <span className="autocomplete--location">{suggestion.region}, {suggestion.country}</span>
          }
        </a>
      </li>
    )) : <li className="disabled">No results found</li>}
    
  </ul>
);
}

export default Autocomplete;