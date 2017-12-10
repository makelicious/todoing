import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Form from './components/Form';
import Tags from './components/Tags';
import Ideas from './containers/ideas';


const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
`;

const App = () => (
  <div className='App'>
    <Header />
    <Form />
    <BodyWrapper>
      <Tags />
      <Ideas />
    </BodyWrapper>
  </div>
);

export default App;
