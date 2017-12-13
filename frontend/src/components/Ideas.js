import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const IdeaWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column-reverse;
  align-content: center;
  justify-content: center;
  max-width: 80%;
  margin-left: 3rem;
  margin-right: 1rem;
  order: 2;
`;

const IdeaBubble = styled.div`
  align-self: center;
  box-sizing: padding-box;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  margin: 1rem 0;
  max-width: 100%;
  min-width: 150px;
  border-radius: 3px;
  transition: transform 0.3s, opacity 0.6s;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  word-wrap: break-word;
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

class Ideas extends Component {
  componentDidMount = () => {
    this.props.getIdeas();
  };

  render = () => {
    const text = this.props.ideas.map((idea, index) => (
      <IdeaBubble key={index}>
        <ReactMarkdown source={idea.text} />
      </IdeaBubble>
    ));

    return <IdeaWrapper>{text}</IdeaWrapper>;
  };
}

Ideas.propTypes = {
  ideas: PropTypes.array,
  getIdeas: PropTypes.func
};

export default Ideas;
