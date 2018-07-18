import React from 'react';
import HomeBar from './homebar.js';
import {Panel} from 'react-bootstrap';

export default class Register extends React.Component {
  constructor (props) {
    super(props)
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
            <input type="email" className="form-control" placeholder='email address'></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <input type="password" className="form-control" placeholder='password'></input>
          </div>
          <button type="submit"  className="btn btn-default">Register</button>
        </form>
</div>
      </div>
    );
  }
}
