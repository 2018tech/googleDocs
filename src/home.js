/**
 * @file Sets up the home page of the app after successful login. Displays
 * a list of all documents owned by the user.
 * @author Raj Kane
 * @author Jon Lee
 * @author Henry Gaskin
 * @author Anshul Nanda
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
        <Panel.Title componentClass="h3">folders
          <div className="docbuttons">
          <button onMouseDown={() => this.props.redirect('Document')}>Create doc</button>
          <button>add existing doc</button>
          </div>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>File1.doc</Panel.Body>
      <Panel.Body>File2.doc</Panel.Body>
      <Panel.Body>File3.doc</Panel.Body>
      <Panel.Body>File4.doc</Panel.Body>
      <Panel.Body>File5.doc</Panel.Body>
      <Panel.Body>File6.doc</Panel.Body>
    </Panel>
</div>
      </div>
    );
  }
}
