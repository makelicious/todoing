import '../styles/font-awesome/css/font-awesome.css';
import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { filterBy } from '../modules/ideas';
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

const Header = props => (
  <Wrapper>
    <IconWrapper>
      <Navigation>
        {
          Object.entries(iconStyles).map(([key, value]) =>
            <FontAwesome
              key={key}
              ariaLabel={key}
              name={value}
              onClick={() => props.filterBy(key)}
              size='2x'
              style={{ color: props.filters[key] ? '#68C3D4' : '#568EA3', padding: '1rem' }}
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

const mapDispatchToProps = dispatch => ({
  filterBy: type => {
    dispatch(filterBy(type));
  }
});

const mapStateToProps = state => {
  return {
    filters: state.ideas.filters,
  };
};

Header.propTypes = {
  filterBy: PropTypes.func,
  filters: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
