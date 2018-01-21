import React from 'react';

const Autocomplete = props => {
  
  console.log(props.suggestions);

  return (
  <ul className="autocomplete__list">
    {props.suggestions.map((suggestion, index) => (
      <li key={suggestion.locationId-index}>
        <a href="#">
          {suggestion.label && <span className={`autocomplete__label ${suggestion.label}` }>{suggestion.label}</span>}
          <em>{suggestion.name && suggestion.name.substring(0, 3)}</em>{suggestion.name && suggestion.name.substring(3)} {suggestion.iata && `(${suggestion.iata})`}
          {suggestion.label === "airport" ? <span>{suggestion.city}, {suggestion.country}</span> 
          : suggestion.label === "station" ? <span>{suggestion.city}, {suggestion.region}, {suggestion.country}</span>
          : <span>{suggestion.region}, {suggestion.country}</span>
          }
        </a>
      </li>
    ))}
    
  </ul>
);
}

export default Autocomplete;