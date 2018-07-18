/**
 * @file Sets up the home page of the app after successful login. Displays
 * a list of all documents owned by the user.
 */

import React from 'react';
import HomeBar from './homebar.js';
import {Panel} from 'react-bootstrap';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div className="filespage">
      <HomeBar redirect={this.props.redirect} />
      <h2 className="documenteditor">Files</h2>
      <div className="filestable">
        <Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title componentClass="h3">folders</Panel.Title>
      </Panel.Heading>
      <Panel.Body>Panel content</Panel.Body>
      <Panel.Body>Panel content</Panel.Body>
      <Panel.Body>Panel content</Panel.Body>
      <Panel.Body>Panel content</Panel.Body>
      <Panel.Body>Panel content</Panel.Body>
      <Panel.Body>Panel content</Panel.Body>
    </Panel>
</div>
      </div>
    );
  }
}
