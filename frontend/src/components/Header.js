import '../styles/font-awesome/css/font-awesome.css';
import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { iconStyles } from '../utils';

const Wrapper = styled.div`
  position: fixed;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 80px;
  border-bottom: solid 1px #D2D2D5;
`;

const IconWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  align-items: center;
`;

const Search = styled.input`
  background: rgba(255, 255, 255, 0.8);
  border-style: solid;
  border: solid 1px #D2D2D5;
  font-size: 16px;
  border-radius: 3px;
  padding: 0.5rem;
  margin-right: 1rem;
  width: 25%;
  transition: width 300ms;

  &:focus {
    width: 40%;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5 0.75em;
	}
`;

const Navigation = styled.nav`
  width: 100%;
`;

const Header = () => (
  <Wrapper>
    <IconWrapper>
      <Navigation>
        {
          Object.entries(iconStyles).map(([key, value]) =>
            <FontAwesome
              key={key}
              ariaLabel={key}
              name={value}
              size='2x'
              style={{ color: '#68C3D4', padding: '1rem' }}
            />
          )
        }
      </Navigation>
    </IconWrapper>
    <SearchWrapper>
      <Search
        placeholder='Search' />
    </SearchWrapper>
  </Wrapper>
);

export default Header;