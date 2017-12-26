import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from 'react-redux';
import { fetchTags } from '../modules/tags';

const TagListWrapper = styled.div`
  width: 20%;
  margin: 0 1rem;
  margin-top: 20rem;
  position: fixed;
`;

const TagList = styled.ul`
  margin: 0;
  margin-bottom: 2em;
  padding: 0;
  list-style-type: none;
`;

const TagListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 0.5rem 0.25rem;
  word-break: break-all;
  transition: all 0.25s linear;
  color: #107896;
  &:hover {
    background-color: #107896;
    opacity: 0.9;
    color: #fff;
  }
`;

class Tags extends Component {
  componentDidMount = () => {
    this.props.fetchTags();
  };

  render = () => (
    <TagListWrapper>
      <TagList>
        {this.props.tags.map(tag =>
          <TagListItem key={tag}>{tag}</TagListItem>
        )}
      </TagList>
    </TagListWrapper>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
  fetchTags: PropTypes.func,
};


const mapStateToProps = state => {
  console.log(state);
  return {
    tags: state.tags.tags,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTags: () => {
    dispatch(fetchTags());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tags);

