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
import {Panel, Button} from 'react-bootstrap';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      documents: []
    };
  };

  componentDidMount() {
    fetch('http:localhost:3000/documents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({documents: res})
      })
        .catch(err => console.log('Error ', err));
  };

  sharedid(value) {
      this.setState({
        sharedid: value
      })
  }

  onJoin() {
    fetch('http:localhost:3000/joindocument?id=' + this.state.sharedid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({documents: res})
      })
        .catch(err => console.log('Error ', err));
  }

  render() {
    console.log(this.state.documents);
    return (
      <div className="filespage">
      <HomeBar redirect={this.props.redirect} />
      <h2 className="documenteditor">Files</h2>
      <div className="filestable">
        <Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title componentClass="h3">folders
          <div className="docbuttons">
          <Button onMouseDown={() => this.props.redirect('CreateDocument')}>Create doc</Button>
          <Button>add existing doc</Button>
          </div>
        </Panel.Title>
        <input onChange={e=> this.sharedid(e.target.value)}/><Button onClick = {e => this.onJoin()}>Join</Button>
      </Panel.Heading>
      {this.state.documents.map(document => <Panel.Body><button onClick={e => this.props.app.redirect("Document", {doc: document})}>Edit</button> name: {document.documentName} ID: {document._id}</Panel.Body>)}
    </Panel>
</div>
      </div>
    );
  }
}
//it gets pretty confusing at {this.state.documents.map}
