import React, { Component, Fragment } from "react";
import "../styles/font-awesome/css/font-awesome.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";
import { submitIdea } from "../modules/ideas";
import Textarea from "react-textarea-autosize";
import { iconStyles } from "../utils";

const iconStyle = {
  fontSize: "1.5rem",
  color: "inherit"
};

const FormWrapper = styled.div`
  width: 60%;
  margin: 2rem 1rem 2rem 3rem;
  overflow-x: hidden;
`;

const IdeaForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.95);
  align-self: center;
  align-items: center;
  margin: 2rem 0;
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
  border-bottom: solid 1px #d2d2d5;
`;

const TypeLabel = styled.label`
  display: flex;
  padding: 1em;
  color: #7c7c7c;
  opacity: 0.9;
`;

const TextWrapper = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
  align-text: center;
`;

const textareaStyles = {
  fontSize: "24px",
  margin: "1rem 5%",
  border: 0,
  resize: "none",
  background: "transparent",
  outline: 0,
  width: "90%"
};

const CheckBox = styled.input.attrs({
  type: "checkbox"
}) `
  display: none;
  &:checked + ${TypeLabel} {
    color: #ff6f00;
  }
`;

const initialState = {
  type: {
    todo: false,
    done: false,
    when: false,
    what: false,
    why: false,
    how: false
  },
  text: "",
  tags: []
};

class Form extends Component {
  state = { ...initialState };

  changeText = event => {
    this.setState({
      ...this.state,
      text: event.target.value
    });
  };

  submitIfEnter = event => {
    if (!event.shiftKey && event.keyCode === 13) {
      this.submitText(event);
    }
  };

  submitText = event => {
    event.preventDefault();
    const tags = this.parseTags(this.state.text);

    this.props.submitIdea({
      ...this.state,
      tags,
    });

    this.setState({
      ...initialState
    });
  };

  addLabel = event => {
    this.setState({
      ...this.state,
      type: {
        ...this.state.type,
        [event.target.id]: event.target.checked
      }
    });
  };

  parseTags = text => {
    const tagRegex = /(#\S*)/g;
    const rawTags = text.match(tagRegex);

    return rawTags
      ? rawTags.map(tag => {
        const tagWithoutHash = tag.slice(1, tag.length);

        return tagWithoutHash.toLowerCase();
      })
      : [];
  }

  render() {
    const { type } = this.state;
    return (
      <FormWrapper>
        <IdeaForm onSubmit={this.submitText} onKeyDown={this.submitIfEnter}>
          <TypeWrapper>
            {Object.entries(iconStyles).map(([key, value]) => (
              <Fragment key={key}>
                <CheckBox id={key} checked={type[key]} onChange={this.addLabel} key={key} />
                <TypeLabel title={key} htmlFor={key}>
                  <FontAwesome name={value} style={iconStyle} />
                </TypeLabel>
              </Fragment>
            ))}
          </TypeWrapper>
          <TextWrapper>
            <Textarea rows={4} style={textareaStyles} onChange={this.changeText} value={this.state.text} />
          </TextWrapper>
        </IdeaForm>
      </FormWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitIdea: idea => {
    dispatch(submitIdea(idea));
  }
});

const mapStateToProps = state => state;

Form.propTypes = {
  submitIdea: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
