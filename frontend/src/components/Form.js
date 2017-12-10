import React, { Component } from 'react';
import '../styles/font-awesome/css/font-awesome.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { submitIdea } from '../modules/ideas';
import Textarea from "react-textarea-autosize";

const iconStyle = {
  fontSize: '1.5rem',
  color: 'inherit',
};

const What = () => (
  <FontAwesome
    ariaLabel='why'
    name='info'
    style={iconStyle}
  />
);

const Why = () => (
  <FontAwesome
    name='question'
    style={iconStyle}
  />
);

const When = () => (
  <FontAwesome
    name='clock-o'
    style={iconStyle}
  />
);

const How = () => (
  <FontAwesome
    name='wrench'
    style={iconStyle}
  />
);

const Done = () => (
  <FontAwesome
    name='check'
    style={iconStyle}
  />
);

const Todo = () => (
  <FontAwesome
    name='exclamation'
    style={iconStyle}
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
  padding: 1em;
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

const CheckBox = styled.input.attrs({
  type: 'checkbox',
}) `
  display: none;
  &:checked + ${TypeLabel} {
    color: #f58b47;
  }
`;

const initialState = {
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
};

class Form extends Component {
  state = { ...initialState };

  changeText = event => {
    this.setState({
      ...this.state,
      text: event.target.value,
    });
  };

  submitIfEnter = event => {
    if (!event.shiftKey && event.keyCode === 13) {
      this.submitText(event);
    }
  }

  submitText = event => {
    event.preventDefault();

    this.props.submitIdea(this.state);
    this.setState({
      ...initialState,
    });
  };

  addLabel = event => {
    this.setState({
      ...this.state,
      type: {
        ...this.state.type,
        [event.target.id]: event.target.checked,
      },
    });
  }


  render() {
    const { type } = this.state;
    const {
      todo,
      done,
      when,
      what,
      why,
      how,
    } = type;
    return (
      <FormWrapper>
        <IdeaForm
          onSubmit={this.submitText}
          onKeyDown={this.submitIfEnter}>
          <TypeWrapper>
            <CheckBox
              id='todo'
              checked={todo}
              onChange={this.addLabel} />
            <TypeLabel
              title='todo'
              htmlFor='todo'
            >
              <Todo />
            </TypeLabel>
            <CheckBox
              id='done'
              checked={done}
              onClick={this.addLabel}
            />
            <TypeLabel
              title='done'
              htmlFor='done'
            >
              <Done />
            </TypeLabel>
            <CheckBox
              id='when'
              checked={when}
              onClick={this.addLabel} />
            <TypeLabel
              title='when'
              htmlFor='when'
            >
              <When />
            </TypeLabel>
            <CheckBox
              id='what'
              checked={what}
              onClick={this.addLabel} />
            <TypeLabel
              title='what'
              htmlFor='what'>
              <What />
            </TypeLabel>
            <CheckBox
              id='why'
              checked={why}
              onClick={this.addLabel} />
            <TypeLabel
              title='why'
              htmlFor='why'>
              <Why />
            </TypeLabel>
            <CheckBox
              id='how'
              checked={how}
              onClick={this.addLabel} />
            <TypeLabel
              title='how'
              htmlFor='how'>
              <How />
            </TypeLabel>
          </TypeWrapper>
          <TextWrapper>
            <Textarea
              rows={4}
              style={textareaStyles}
              onChange={this.changeText}
              value={this.state.text}
            />
          </TextWrapper>
        </IdeaForm>
      </FormWrapper >
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
  submitIdea: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);