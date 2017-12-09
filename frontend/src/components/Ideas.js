import React from 'react';
import PropTypes from 'prop-types';

const Ideas = props => {
  const text = props.ideas.map(idea, index =>
    <li key={index}>
      {idea.text}
    </li>
  );

  return (
    <div>
      <ul>
        {text}
      </ul>
    </div>
  );
};

Ideas.propTypes = {
  ideas: PropTypes.array,
};

export default Ideas;