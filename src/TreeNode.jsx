import React, { Component } from 'react';
import classNames from 'classnames';

import TreeForm from './TreeForm';
import './TreeNode.css';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formHidden: true,
      collapse: props.root ? false : true,
    }
    this.children = [];
  }

  handleAddClick() {
    this.setState({
      formHidden: !this.state.formHidden
    })
  }

  handleSubmitClick() {
    let key = this.treeForm.value('key');
    let value = this.treeForm.value('value');
    this.treeForm.setValue('key', '');
    this.treeForm.setValue('value', '');
    let newObject = value;
    try {
      newObject = JSON.parse(value);
    } catch (e) {
      console.log(e);
    }

    if (this.type === 'array') {
      this.props.value.push(newObject);
    } else if (this.type === 'object') {
      this.props.value[key] = newObject;
    }

    this.props.handleTreeChange();

    this.setState({
      formHidden: true,
      collapse: false
    })
  }

  handleRemoveClick(id) {
    if (this.type === 'array') {
      this.props.value.splice(id, 1);
    } else if (this.type === 'object') {
      delete this.props.value[id];
    }

    this.props.handleTreeChange();
  }

  handleChevronClick() {
    this.setState({collapse: !this.state.collapse});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      // Enter
      this.handleSubmitClick();
    } else if (event.keyCode === 27) {
      // Esc
      this.handleAddClick();
    }
  }

  isRootAndEmpty() {
    return this.props.root && !this.props.value;
  }

  collapseAll(collapse) {
    let collapseBool = Boolean(collapse);
    this.setState({
      collapse: collapseBool
    });
    this.children.forEach(elem => elem.collapseAll(collapseBool));
  }

  render() {
    if (typeof this.props.value === 'string' || this.props.value instanceof String) {
      this.type = 'string';
    } else if (typeof this.props.value === 'number' || this.props.value instanceof Number) {
      this.type = 'number';
    } else if (typeof this.props.value === 'boolean' || this.props.value instanceof Boolean) {
      this.type = 'boolean';
    } else if (this.props.value == null) {
      this.type = 'null';
    } else if (Array.isArray(this.props.value)) {
      this.type = 'array';
    } else {
      this.type = 'object';
    }

    let children;
    let value;

    if (this.type === 'boolean' || this.type === 'null' || this.type === 'number') {
      children = '';
      value = String(this.props.value);
    } else if (this.type === 'string') {
      children = '';
      value = JSON.stringify(this.props.value);
    } else if (this.type === 'array') {
      children = this.props.value.map((element, index) => {
        return (
          <li>
            <TreeNode 
                name={index} 
                value={element}
                ref={elem => this.children[index] = elem} 
                handleTreeChange={() => this.props.handleTreeChange()}
                handleRemoveClick={(id) => this.handleRemoveClick(id)} />
          </li>
        );
      });
      value = this.type;
    } else if (this.type === 'object') {
      children = Object.keys(this.props.value).map((element, index) => {
        return (
          <li>
            <TreeNode 
                name={element} 
                value={this.props.value[element]} 
                ref={elem => this.children[index] = elem} 
                handleTreeChange={() => this.props.handleTreeChange()}
                handleRemoveClick={(id) => this.handleRemoveClick(id)} />
          </li>
        );
      });
      value = this.type;
    }

    let line;
    if (this.isRootAndEmpty()) {
      line = (
        <span>
          Make Root an&nbsp;
          <a href="" 
              onClick={e => {
                e.preventDefault();
                this.props.makeRoot('Array');
              }}>
            Array
          </a> 
          &nbsp;or an&nbsp;
          <a href="" 
              onClick={e => {
                e.preventDefault();
                this.props.makeRoot('Object');
              }}>
            Object
          </a> 
        </span>
      );
    } else {
      line = (
        <a className="TreeNode-line TreeNode-flex"
            onClick={() => this.handleChevronClick()}
            ref={elem => this.line = elem}>
          <div className="TreeNode-arrow">
            <i className={classNames(
              'fa',
              {'fa-chevron-right': this.state.collapse, 
              'fa-chevron-down': !this.state.collapse,
              invisible: !(this.type === 'array' || this.type === 'object')})} 
              aria-hidden="true"></i>
          </div>
          <span className="TreeNode-key">{this.props.name}</span>:&nbsp;
          <span className={classNames(
              "TreeNode-" + this.type.toLowerCase(), {
                'TreeNode-wrap': false
              })}>
            {value}
          </span>
        </a>
      );
    }
    
    return (
      <div>
        <div className="TreeNode-flex">
          {line}
          <div 
              className={classNames(
                'TreeNode-button',
                {'hidden-xs-up': this.type !== 'object' && this.type !== 'array'})}
              onClick={() => this.handleAddClick()}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
          <div
              className={classNames(
                'TreeNode-button',
                {'hidden-xs-up': this.isRootAndEmpty()})} 
              onClick={() => {
                this.props.handleRemoveClick(this.props.name);
                this.setState({formHidden: true});
              }}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <ul className={classNames('TreeNode-list', {'TreeNode-margin': !this.state.collapse && children})}>
          <div className={classNames('TreeNode-form', {'TreeNode-margin': !this.state.formHidden})}>
            <TreeForm 
                type={this.type}
                hidden={this.state.formHidden}
                handleSubmitClick={(key, value) => this.handleSubmitClick(key, value)}
                handleCancelClick={() => this.handleAddClick()}
                handleKeyUp={e => this.handleKeyUp(e)}
                ref={elem => this.treeForm = elem} />
          </div>
          <div className={classNames({'hidden-xs-up': this.state.collapse})}>
            {children}
          </div>
        </ul>
      </div>
    );
  }
}

export default TreeNode;
