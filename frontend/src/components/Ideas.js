import '../styles/font-awesome/css/font-awesome.css';
import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import styled from "styled-components";
import FontAwesome from 'react-fontawesome';
import ReactMarkdown from "react-markdown";
import moment from 'moment';
import _ from 'lodash';
import { iconStyles } from '../utils';
import { fetchIdeas } from '../modules/ideas';

const iconStyle = {
  color: '#ff6f00',
  marginRight: '5px',
  float: 'right',
};

const IdeaWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column-reverse;
  align-content: center;
  justify-content: center;
  max-width: 65%;
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
  max-width: 80%;
  min-width: 150px;
  border-radius: 3px;
  transition: transform 0.3s, opacity 0.6s;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
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

const Timestamp = styled.div``;

class Ideas extends Component {
  componentDidMount = () => {
    this.props.fetchIdeas();
  };

  render = () => {
    const { ideas, filters } = this.props;
    const text = ideas
      .filter(idea => filterIdea(idea, filters))
      .map((idea, index) => (
        <IdeaBubble key={index}>
          {
            Object.entries(idea.type).map(([key, value]) => (
              value &&
              <FontAwesome
                name={iconStyles[key]}
                style={iconStyle} />))
          }
          <ReactMarkdown source={idea.text} />
          <Timestamp>{moment(idea.createdAt).format('MMM Do YYYY h:mm')}</Timestamp>
        </IdeaBubble>
      ));

    return <IdeaWrapper>{text}</IdeaWrapper>;
  };
}

Ideas.propTypes = {
  ideas: PropTypes.array,
  fetchIdeas: PropTypes.func,
  filters: PropTypes.object,
};

function filterIdea(idea, filters) {
  return filters.tags.length === 0
    || _.difference(filters.tags, idea.tags).length === 0
    || _.intersection(filters.tags, idea.tags).length > 0;
}

const mapStateToProps = state => {
  return {
    ideas: state.ideas.ideas,
    filters: state.filters,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchIdeas: () => {
    dispatch(fetchIdeas());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ideas);

