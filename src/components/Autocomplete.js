import React from 'react';

const Autocomplete = props => {
  
  console.log(props.suggestions);

  return (
  <ul className="autocomplete--list">
    {props.suggestions.length ? props.suggestions.map((suggestion, index) => (
      <li key={suggestion.locationId-index}>
        <a href="#">
          {suggestion.label && <span className={`autocomplete--label ${suggestion.label}` }>{suggestion.label}</span>}
          {suggestion.name && suggestion.name} {suggestion.iata && `(${suggestion.iata})`}
          {suggestion.label === "airport" ? <span>{suggestion.city}, {suggestion.country}</span> 
          : suggestion.label === "station" ? <span>{suggestion.city}, {suggestion.region}, {suggestion.country}</span>
          : <span>{suggestion.region}, {suggestion.country}</span>
          }
        </a>
      </li>
    )) : <li class="disabled">No results found</li>}
    
  </ul>
);
}

export default Autocomplete;