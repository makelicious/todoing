import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Form from "./components/Form";
import Tags from "./components/Tags";
import Ideas from "./components/Ideas";
import bgImage from "./assets/1443890484047-5eaa67d1d630.jpeg";

const Background = styled.div`
  background: #fff url(${bgImage}) no-repeat;
  background-attachment: fixed;
  position: absolute;
  min-height: 100%;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  top: 0;
  left: 0;
`;

const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Foo = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  width: 100%;
  margin-left: 20%;
`;

const App = () => (
  <Background>
    <Header />
    <BodyWrapper>
      <Tags />
      <Foo>
        <Form />
        <Ideas />
      </Foo>
    </BodyWrapper>
  </Background>
);

export default App;
