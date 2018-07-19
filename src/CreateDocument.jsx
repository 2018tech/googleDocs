import React from 'react';
import HomeBar from './homebar.js';
import {Panel} from 'react-bootstrap';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      documentName: '',
      password: ''
    }
  };

  onTitleChange(e) {
    this.setState({
      documentName: e.target.value
    });
  };

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  };

  onCreateDocument(e) {
    console.log(this.state.username, this.state.password)
    fetch('http:localhost:3000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        documentName: this.state.documentName,
        password: this.state.password
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.success) {
            console.log(res);
            console.log('User added: ', this.state.username);
            this.props.app.redirect("Document", {doc: res.doc});
        } else {
            console.log(res.status);
        }
      })
        .catch(err => console.log('Error ', err));
  }

  render() {
    return (
      <div className="filespage">
      <HomeBar redirect={this.props.redirect} />
      <h2 className="documenteditor">Create document</h2>
      <div className="formbox">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="email" value= {this.state.title} onChange={e => this.onTitleChange(e)} className="form-control" placeholder='Title'></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <input type="password" onChange={e => this.onPasswordChange(e)} className="form-control" placeholder='password'></input>
          </div>
          <button type="submit" onClick={e => this.onCreateDocument(e)} className="btn btn-default">Create</button>
        </form>
</div>
      </div>
    );
  }
}
