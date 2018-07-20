/**
 * @file Sets up the home page of the app after successful login. Displays
 * a list of all documents owned by the user.
 */

import React from 'react';
import HomeBar from './homebar.js';
import {Panel, Button} from 'react-bootstrap';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div className="filespage">
      <HomeBar redirect={this.props.redirect} />
      <h2 className="documenteditor"></h2>
      <div className="filestable">
        <Panel bsStyle="info">

      <Panel.Heading>
        <span className="alignleft">Folders</span>
        <Panel.Title>

          <Button bsStyle="primary" title="New Document">New <span className="glyphicon glyphicon-file"></span>
          </Button>

          <Button bsStyle="primary" title="Add Document by ID">Add <span className="glyphicon glyphicon-file"></span>
          </Button>
        </Panel.Title>
      </Panel.Heading>

          <div>

      <Panel.Body>File1.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
      <Panel.Body>File2.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
      <Panel.Body>File3.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
      <Panel.Body>File4.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
      <Panel.Body>File5.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
      <Panel.Body>File6.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
      <Panel.Body>File7.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
      <Panel.Body>File8.doc
        <div className="space">
        <Button bsStyle="success">Open</Button>
        </div>
        <Button bsStyle="info" title="Document ID"><span className="glyphicon glyphicon-link"></span></Button>
      </Panel.Body>
    </div>
    </Panel>
</div>
      </div>
    );
  }
}
