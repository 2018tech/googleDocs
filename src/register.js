import React from 'react';
import HomeBar from './homebar.js';
import {Panel} from 'react-bootstrap';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  };

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  };

  onRegister(e) {
    console.log(this.state.username, this.state.password)
    fetch('http:localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then(res => {
        switch(res.status) {
          case 200:
            console.log(res);
            console.log('User added: ', this.state.username);
            this.props.app.setState({currentPage: "Login"});
            break;
          default:
            console.log(res.status);
        }
      })
        .catch(err => console.log('Error ', err));
  }

  render() {
    return (
      <div className="filespage">
      <HomeBar redirect={this.props.redirect} />
      <h2 className="documenteditor">Register</h2>
      <div className="formbox">
        <form>
          <div className="form-group">
            <label>email</label>
            <input type="email" onChange={e => this.onUsernameChange(e)} className="form-control" placeholder='username'></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <input type="password" onChange={e => this.onPasswordChange(e)} className="form-control" placeholder='password'></input>
          </div>
          <button type="submit" onClick={e => this.onRegister(e)} className="btn btn-default">Register</button>
        </form>
</div>
      </div>
    );
  }
}
