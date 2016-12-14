import React, { Component } from 'react';

import './AutosizeInput.css';

class AutosizeInput extends Component {
  value() {
    return this.textInput.value;
  }

  setValue() {
    this.textInput.value = '';
  }

  handleTextChange() {
    let style = window.getComputedStyle(this.textInput, null);
    let font = style.getPropertyValue('font');
    let paddingLeft = parseInt(style.getPropertyValue('padding-left'), 10);
    let paddingRight = parseInt(style.getPropertyValue('padding-right'), 10);
    let borderLeftWidth = parseInt(style.getPropertyValue('border-left-width'), 10);
    let borderRightWidth = parseInt(style.getPropertyValue('border-right-width'), 10);
    let width = getTextWidth(this.textInput.value, font);
    this.textInput.style.width = 
        width
        + paddingLeft
        + paddingRight
        + borderLeftWidth
        + borderRightWidth
        + 1 + 'px';
  }

  render() {
    return (
      <input 
          className={this.props.className}
          placeholder={this.props.placeholder}
          ref={elem => this.textInput = elem}
          onChange={e => {
            this.handleTextChange();
            if (this.props.onChange) {
              this.props.onChange(e);
            }
          }} />
    );
  }
}

export default AutosizeInput;

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
