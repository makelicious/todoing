import '../styles/font-awesome/css/font-awesome.css';
import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const What = () => (
  <FontAwesome
    name='info'
    size='2x'
  />
);

const Why = () => (
  <FontAwesome
    name='question'
    size='2x'
  />
);

const When = () => (
  <FontAwesome
    name='clock-o'
    size='2x'
    style={{
      color: '#f58b47',
      borderBottom: '3px solid #f58b47',
      paddingBottom: '6px'
    }}
  />
);

const How = () => (
  <FontAwesome
    name='wrench'
    size='2x'
  />
);

const Done = () => (
  <FontAwesome
    name='check'
    size='2x'
  />
);

const Todo = () => (
  <FontAwesome
    name='exclamation'
    size='2x'
  />
);

const Pencil = () => (
  <FontAwesome
    name='pencil'
    size='3x'
  />
);

const Wrapper = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  background-color: rgba(230, 230, 234, 0.95);
  width: 100%;
  height: 80px;
  border-bottom: solid 1px #D2D2D5;
`;

const WrapperTab = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;

const Search = styled.input`
  background: rgba(255, 255, 255, 0.8);
  border-style: solid;
  border: solid 1px #D2D2D5;
  font-size: 16px;
  border-radius: 3px;
  padding: 0.5em;
  width: 37.5%;
  transition: width 300ms;

  &:focus {
    width: 75%;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5 0.75em;
	}
`;

const Navigation = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-right: 2em;
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding-left: 2em;
`;

const Header = () => (
  <Wrapper>
    <WrapperTab>
      <Logo>
        <Pencil />
        <div>Todo</div>
      </Logo>
    </WrapperTab>
    <WrapperTab>
      <Search
        placeholder='Search' />
    </WrapperTab>
    <WrapperTab>
      <Navigation>
        <Todo />
        <Done />
        <When />
        <What />
        <Why />
        <How />
      </Navigation>
    </WrapperTab>
  </Wrapper>
);

export default Header;