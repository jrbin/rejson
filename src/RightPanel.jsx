import React, { Component } from 'react';
import classNames from 'classnames';

import './RightPanel.css';

class RightPanel extends Component {
  render() {
    return (
      <div className="RightPanel">
        <textarea 
            className={classNames('form-control', 'RightPanel-textarea', 'g-monospaced', {'RightPanel-nowrap': !this.props.lineWrap})}
            onChange={(e) => this.props.handleTextChange(e)} 
            value={this.props.json}></textarea>
        <div className="RightPanel-bottom">
          <form className="form-inline RightPanel-form">
            <div className="form-group">
              <button
                  type="button"
                  className="btn btn-outline-primary form-control"
                  onClick={() => this.props.handleSaveClick()}>
                Save
              </button>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={this.props.autosave}
                    onChange={() => this.props.handleAutosaveClick()} /> 
                Autosave
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={this.props.prettify}
                    onChange={() => this.props.handlePrettifyClick()} /> 
                Prettify
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={this.props.lineWrap}
                    onChange={() => this.props.handleLineWrapClick()} /> 
                Line Warp
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RightPanel;
