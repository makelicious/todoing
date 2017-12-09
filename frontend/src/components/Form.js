import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes, { func } from 'prop-types';
import { submitIdea } from '../modules/ideas';

const initialState = {
  current: {
    done: false,
    type: {
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

  submitText = event => {
    event.preventDefault();

    this.props.submitIdea(this.state.current);
    this.setState({
      ...initialState,
    });
  };


  render() {
    return (
      <form onSubmit={this.submitText}>
        <label>
          Done
        <input type='checkbox' />
        </label>
        <label>
          Why
        <input type='checkbox' />
        </label>
        <label>
          What
        <input type='checkbox' />
        </label>
        <label>
          How
        <input type='checkbox' />
        </label>
        <textarea onChange={this.changeText} value={this.state.current.text} />
        <button />
      </form>
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