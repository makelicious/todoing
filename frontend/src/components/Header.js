import '../styles/font-awesome/css/font-awesome.css';
import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const iconStyles = {
  todo: 'exclamation',
  done: 'check',
  when: 'clock-o',
  what: 'info',
  why: 'question',
  how: 'wrench',
};

const Pencil = () => (
  <FontAwesome
    name='pencil'
    size='3x'
  />
);

const Wrapper = styled.div`
  position: fixed;
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
        {
          Object.entries(iconStyles).map(([key, value]) =>
            <FontAwesome
              key={key}
              ariaLabel={key}
              name={value}
              size='2x'
            />
          )
        }
      </Navigation>
    </WrapperTab>
  </Wrapper>
);

export default Header;