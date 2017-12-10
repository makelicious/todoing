import React, { Component } from 'react';
import '../styles/font-awesome/css/font-awesome.css';
import { connect } from 'react-redux';
import propTypes, { func } from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { submitIdea } from '../modules/ideas';
import Textarea from "react-textarea-autosize";

const What = () => (
  <FontAwesome
    name='info'
    style={{ fontSize: '1.5rem' }}
  />
);

const Why = () => (
  <FontAwesome
    name='question'
    style={{ fontSize: '1.5rem' }}
  />
);

const When = () => (
  <FontAwesome
    name='clock-o'
    style={{ fontSize: '1.5rem' }}
  />
);

const How = () => (
  <FontAwesome
    name='wrench'
    style={{ fontSize: '1.5rem' }}
  />
);

const Done = () => (
  <FontAwesome
    name='check'
    style={{ fontSize: '1.5rem' }}
  />
);

const Todo = () => (
  <FontAwesome
    name='exclamation'
    style={{ fontSize: '1.5rem' }}
  />
);

const FormWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 3rem;
  margin-right: 1rem;
`;

const IdeaForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.95);
  align-self: center;
  align-items: center;
  margin: 2rem 0;
  width: 80%;
  border: solid 1px #D2D2D5;
  border-radius: 3px;
`;

const TypeWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 33%;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: solid 1px #D2D2D5;
`;

const TypeLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
  align-text: center;
`;

const textareaStyles = {
  fontSize: '24px',
  margin: '1rem 5%',
  border: 0,
  resize: 'none',
  background: 'transparent',
  outline: 0,
  width: '90%',
};

const initialState = {
  current: {
    type: {
      todo: false,
      done: false,
      when: false,
      what: false,
      why: false,
      how: false,
    },
    text: '',
    tags: [],
  },
};

class Form extends Component {
  state = { ...initialState };

  changeText = event => {
    this.setState({
      ...this.state,
      current: {
        ...this.state.current,
        text: event.target.value
      }
    });
  };

  submitIfEnter = event => {
    if (!event.shiftKey && event.keyCode === 13) {
      this.submitText(event);
    }
  }

  submitText = event => {
    event.preventDefault();

    this.props.submitIdea(this.state.current);
    this.setState({
      ...initialState,
    });
  };


  render() {
    return (
      <FormWrapper>
        <IdeaForm
          onSubmit={this.submitText}
          onKeyDown={this.submitIfEnter}>
          <TypeWrapper>
            <TypeLabel title='Todo'>
              <Todo />
            </TypeLabel>
            <TypeLabel title='Done'>
              <Done />
            </TypeLabel>
            <TypeLabel title='When'>
              <When />
            </TypeLabel>
            <TypeLabel title='What'>
              <What />
            </TypeLabel>
            <TypeLabel title='Why'>
              <Why />
            </TypeLabel>
            <TypeLabel title='How'>
              <How />
            </TypeLabel>
          </TypeWrapper>
          <TextWrapper>
            <Textarea
              rows={4}
              style={textareaStyles}
              onChange={this.changeText}
              value={this.state.current.text} />
          </TextWrapper>
        </IdeaForm>
      </FormWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitIdea: (idea) => {
    dispatch(submitIdea(idea));
  }
});

const mapStateToProps = state => state;

Form.propTypes = {
  submitIdea: func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);