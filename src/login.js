/**
 * @file Sets up a login page.
 * @author Raj Kane
 * @author Jon Lee
 * @author Henry Gaskin
 * @author Anshul Nanda
 */

import React from 'react';
import HomeBar from './homebar.js';


export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state ={
      username: '',
      password: ''
    }
  }

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

  onLogin(e) {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then(res => {
        switch(res.status) {
          case 200:
            console.log(res);
            console.log('User validated: ', this.state.username);
            this.props.app.setState({currentPage: "Home"})
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
    <h2 className="documenteditor">Login</h2>
    <div className='formbox'>
      <form>
        <div className="form-group">
          <label>email</label>
          <input type="email" onChange={e => this.onUsernameChange(e)} className="form-control" placeholder='email address'></input>
        </div>
        <div className="form-group">
          <label>password</label>
          <input type="password" onChange={e => this.onPasswordChange(e)} className="form-control" placeholder='password'></input>
        </div>
        <button type="submit" onClick={e => this.onLogin(e)} className="btn btn-default">submit</button>
      </form>
    </div>
  </div>
);
}
}
