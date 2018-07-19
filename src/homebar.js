/**
 * @file Sets up a navigation bar inking to the other React files.
 * @author Raj Kane
 * @author Jon Lee
 * @author Henry Gaskin
 * @author Anshul Nanda
 */

import React from 'react';
import {Navbar} from 'react-bootstrap';

export default class HomeBar extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state ={
  //     username: '',
  //   }
  // }

  onLogout(e) {
    console.log('onclick')
    fetch('http://localhost:3000/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        switch(res.status) {
          case 200:
            console.log(res);
            console.log('User logged out');
            this.props.redirect("Login")
            break;
          default:
            console.log(res.status);
        }
      })
        .catch(err => console.log('Error ', err));
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/login', {
  //     method: 'GET',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(res => {
  //       switch(res.status) {
  //         case 200:
  //         console.log(res)
  //           this.setState({
  //             username: res.body.username
  //           })
  //           break;
  //         default:
  //           console.log(res.status);
  //       }
  //     })
  //       .catch(err => console.log('Error ', err));
  // }



  render() {
    return(

      <div>
        <Navbar>
      <Navbar.Header>
      <Navbar.Brand>
        <a href="./document.js">  <img className='homeimage' src ="https://images.hired.com/companies/19279/logos/1459450238/offer.png" /></a>
        <a>Google Docs</a>
      </Navbar.Brand>
      <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Navbar.Text>
        Signed in as: <Navbar.Link href="/">henrygaskin</Navbar.Link>
      </Navbar.Text>
      <Navbar.Text pullRight> <button onClick={e => this.onLogout(e)} >Log Out</button></Navbar.Text>
      </Navbar.Collapse>
      </Navbar>

        <div className="homebar">
          <button onClick={() => this.props.redirect('Register')}>Register</button>
          <button onClick={() => this.props.redirect('Login')}>Login</button>
          <button className="homebarhome" onClick={() => this.props.redirect('Home')}>Folders</button>
          <button onClick={() => this.props.redirect('Document')}>Document</button>
          {/* <button onClick={() =>this.props.redirect()} */}
        </div>
      </div>
    )
  }
}
