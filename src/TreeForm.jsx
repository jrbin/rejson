import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import AutosizeInput from './AutosizeInput';
import './TreeForm.css';

class TreeForm extends Component {
  constructor() {
    super();
    this.state = {
      childType: 'String'
    };
  }

  componentDidUpdate() {
    if (!this.props.formHidden) {
      ReactDOM.findDOMNode(this.inputValue).focus();
      ReactDOM.findDOMNode(this.inputKey).focus();
    }
  }

  onTypeChange(event) {
    this.setState({
      childType: event.target.value
    });
  }

  value(name) {
    if (name === 'key') {
      return this.inputKey.value();
    } else if (name === 'value') {
      return this.inputValue.value();
    }
    return undefined;
  }

  setValue(name, value) {
    if (name === 'key') {
      this.inputKey.setValue(value);
    } else if (name === 'value') {
      this.inputValue.setValue(value);
    }
  }

  render() {
    return (
      <form 
          className={classNames('form', 'form-inline', {'hidden-xs-up': this.props.hidden})}
          onKeyUp={e => this.props.handleKeyUp(e)}>
        <AutosizeInput
            className={classNames(
              'TreeForm-key',
              'g-monospaced',
              'form-control',
              'form-control-sm',
              {'hidden-xs-up': this.props.type === 'array'})}
            ref={elem => this.inputKey = elem}
            placeholder="key" />
        <span className={classNames('g-monospaced', {'hidden-xs-up': this.props.type === 'array'})}>:&nbsp;</span>
        <AutosizeInput
            className={classNames(
              'TreeForm-value',
              'g-monospaced', 
              'form-control',
              'form-control-sm',
              {'hidden-xs-up': this.state.childType !== 'String'})}
            ref={elem => this.inputValue = elem}
            placeholder="value" />
        <button 
            type="button" 
            className="btn btn-primary btn-sm" 
            onClick={() => this.props.handleSubmitClick()}>
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
        <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => this.props.handleCancelClick()}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </form>
    );
  }
}

export default TreeForm;
