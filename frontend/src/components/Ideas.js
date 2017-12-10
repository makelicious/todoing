import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IdeaListWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
`;

const IdeaList = styled.ul`
  list-style-type: none;
`;

const IdeaBubble = styled.div`
  font-size: 24px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  margin: 1rem 0;
  max-width: 90%;
  min-width: 150px;
  border-radius: 3px;
  transition: transform 0.3s, opacity 0.6s;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  animation: bubble-appear 0.4s;

  @keyframes bubble-appear {
    0% {
      opacity: 0;
      transform: translate3d(0, -10vh, 0) scale(0.8, 0.8);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1, 1);
    }
  }
`;


const IdeaListItem = styled.li`
  
`;

const Ideas = props => {
  const text = props.ideas.map((idea, index) =>
    <IdeaListItem key={index}>
      <IdeaBubble>{idea.text}</IdeaBubble>
    </IdeaListItem>
  );

  return (
    <IdeaListWrapper>
      <IdeaList>
        {text}
      </IdeaList>
    </IdeaListWrapper>
  );
};

Ideas.propTypes = {
  ideas: PropTypes.array,
};

export default Ideas;