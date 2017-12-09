import React from 'react';

const Ideas = props => {
  console.log(props);
  return (
    <div>
      <ul>
        {props.ideas.map(idea =>
          <li>{idea.text}</li>
        )}
      </ul>
    </div>
  );
}

export default Ideas;