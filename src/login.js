import React from 'react';
import HomeBar from './homebar.js';


export default class Login extends React.Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
  <div className="filespage">
    <HomeBar redirect={this.props.redirect}/>
    <h2 className="documenteditor">Login</h2>
    <div className='formbox'>
      <form>
        <div className="form-group">
          <label>email</label>
          <input type="email" className="form-control" placeholder='email address'></input>
        </div>
        <div className="form-group">
          <label>password</label>
          <input type="password" className="form-control" placeholder='password'></input>
        </div>
        <button type="submit"  className="btn btn-default">submit</button>
      </form>
    </div>
  </div>
);
}
}
