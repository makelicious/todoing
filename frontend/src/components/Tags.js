import React from 'react';
import styled from 'styled-components';

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
  background-color: rgba(230, 230, 234, 0.95);
  width: 100%;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 0.5rem 0.25rem;
  word-break: break-all;
  transition: all .25s linear;
  color: #107896;;
  &:hover {
    background-color: #107896;
    color: #fff;
  }


`;


const Tags = () => (
  <TagListWrapper>
    <TagList>
      <TagListItem>#Testing</TagListItem>
      <TagListItem>#MockData</TagListItem>
      <TagListItem>#Testing</TagListItem>
      <TagListItem>#MockData</TagListItem>
      <TagListItem>#Testing</TagListItem>
      <TagListItem>#MockData</TagListItem>
      <TagListItem>#Testing</TagListItem>
      <TagListItem>#MockData</TagListItem>
      <TagListItem>#Testing</TagListItem>
      <TagListItem>#MockData</TagListItem>
      <TagListItem>#Testing</TagListItem>
      <TagListItem>#MockData</TagListItem>
    </TagList>
  </TagListWrapper>
);


export default Tags;
