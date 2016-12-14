import React, { Component } from 'react';

import TreeNode from './TreeNode';
import './LeftPanel.css';

class LeftPanel extends Component {
  handleCollapseAll() {
    this.treeRoot.collapseAll(true);
  }

  handleExpandAll() {
    this.treeRoot.collapseAll(false);
  }

  render() {
    return (
      <div className="LeftPanel">
        <div className="LeftPanel-tree g-monospaced">
            <TreeNode 
                name="root" 
                root="root" 
                value={this.props.json}
                ref={elem => this.treeRoot = elem}
                handleRemoveClick={() => this.props.handleRootRemoveClick()}
                handleTreeChange={() => this.props.handleTreeChange()}
                makeRoot={rootType => this.props.makeRoot(rootType)} />
        </div>
        <div className="LeftPanel-bottom">
          <button
              className="btn btn-outline-primary"
              onClick={() => this.handleCollapseAll()}>
            Collapse All
          </button>
          <button
              className="btn btn-outline-primary"
              onClick={() => this.handleExpandAll()}>
            Expand All
          </button>
        </div>
      </div>
    );
  }
}

export default LeftPanel;
