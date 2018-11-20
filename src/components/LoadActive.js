import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'gatsby'


const LoadActive = (active) => {
  console.log(active)
    return (
      <div className="column is-two-thirds">
        <div className="columns">
          <div className="column is-two-thirds"> preview track </div>
          <div className="column"> artwork </div>
        </div>
      </div>
    );
  }

export default LoadActive;
