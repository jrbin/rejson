import React, { Component } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './App.css';

function tryParseJSON (jsonString) {
  if (typeof jsonString === 'string' || jsonString instanceof String) {
    if (jsonString.trim() === '') {
      return '';
    }
  }
  try {
    var o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object", 
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
        return o;
    }
  }
  catch (e) { }

  return false;
};

class App extends Component {
  constructor() {
    super();
    let rawJson = localStorage.getItem('json');
    let json = JSON.parse(rawJson);
    let prettify = localStorage.getItem('prettify');
    prettify = prettify === 'false' ? false : true;
    let lineWrap = localStorage.getItem('lineWrap');
    lineWrap = lineWrap === 'false' ? false : true;
    let autosave = localStorage.getItem('autosave');
    autosave = autosave === 'false' ? false : true;

    if (!json) {
      json = '';
      rawJson = '';
    } else {
      rawJson = prettify ? JSON.stringify(json, null, 2) : JSON.stringify(json);
    }

    this.state = {
      json: json,
      rawJson: rawJson,
      prettify: prettify,
      lineWrap: lineWrap,
      autosave: autosave
    }

    if (autosave) {
      this.autosaveInterval = setInterval(() => this.saveJson(), 5000);
    }
  }
  
  handleTextChange(event) {
    let rawJson = event.target.value;
    let json = tryParseJSON(rawJson);
    this.setState({rawJson: rawJson})
    if (json === '' || json) {
      this.setState({json: json});
    }
  }

  handleTreeChange() {
    let rawJson = this.state.prettify
        ? JSON.stringify(this.state.json, null, 2)
        : JSON.stringify(this.state.json);
    this.setState({rawJson: rawJson});  // force update json text in right panel
  }

  makeRoot(rootType) {
    let json = '';
    if (rootType === 'Array') {
      json = [];
    } else if (rootType === 'Object') {
      json = {};
    }
    this.setState({
      json: json,
      rawJson: JSON.stringify(json, null, 2)
    });
    return false;
  }

  handleRootRemoveClick() {
    this.setState({
      json: '',
      rawJson: '',
    })
  }

  handlePrettifyClick() {
    let prettify = !this.state.prettify;
    let rawJson = prettify
        ? JSON.stringify(this.state.json, null, 2)
        : JSON.stringify(this.state.json);
    localStorage.setItem('prettify', prettify);
    this.setState({
      prettify: prettify,
      rawJson: rawJson
    });
  }

  handleLineWrapClick() {
    let lineWrap = !this.state.lineWrap;
    localStorage.setItem('lineWrap', lineWrap);
    this.setState({
      lineWrap: lineWrap
    });
  }

  handleAutosaveClick() {
    let autosave = !this.state.autosave;

    if (autosave && !this.autosaveInterval) {
      this.autosaveInterval = setInterval(() => this.saveJson(), 5000);
    }
    if (!autosave) {
      clearInterval(this.autosaveInterval);
    }

    localStorage.setItem('autosave', autosave);
    this.setState({
      autosave: autosave
    });
  }

  handleSaveClick() {
    this.saveJson();
  }

  saveJson() {
    if (this.state.json) {
      localStorage.setItem('json', JSON.stringify(this.state.json));
    } else {
      localStorage.removeItem('json');
    }
  }

  render() {
    return (
      <div className="App-wrapper">
        <div className="App-col">
          <LeftPanel 
              json={this.state.json}
              handleRootRemoveClick={() => this.handleRootRemoveClick()}
              handleTreeChange={() => this.handleTreeChange()}
              makeRoot={rootType => this.makeRoot(rootType)} />
        </div>
        <div className="App-col">
          <RightPanel
              prettify={this.state.prettify}
              lineWrap={this.state.lineWrap}
              json={this.state.rawJson}
              autosave={this.state.autosave}
              handleTextChange={e => this.handleTextChange(e)}
              handlePrettifyClick={() => this.handlePrettifyClick()}
              handleLineWrapClick={() => this.handleLineWrapClick()}
              handleAutosaveClick={() => this.handleAutosaveClick()}
              handleSaveClick={() => this.handleSaveClick()} />
        </div>
      </div>
    );
  }
}

export default App;
