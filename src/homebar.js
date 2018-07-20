import React from 'react';
import {Navbar, Button} from 'react-bootstrap';

export default class HomeBar extends React.Component {
  render() {
    return(

      <div>
        <Navbar>
      <Navbar.Header>
      <Navbar.Brand>
        <a> <img className='homeimage' src ="https://images.hired.com/companies/19279/logos/1459450238/offer.png" /></a>
        <em>Google Docs</em>
      </Navbar.Brand>
      <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Navbar.Text>
        Signed in as: <Navbar.Link href="/">Henry Gaskin</Navbar.Link>
      </Navbar.Text>
      <Navbar.Text pullRight> <Button>Log Out</Button></Navbar.Text>
      </Navbar.Collapse>
      </Navbar>

        <div className="homebar">
          <button onClick={() => this.props.redirect('Register')}>Register</button>
          <button onClick={() => this.props.redirect('Login')}>Login</button>
          <button className="homebarhome" onClick={() => this.props.redirect('Home')}>Folders</button>
          <button onClick={() => this.props.redirect('Document')}>Document</button>
        </div>
      </div>
    )
  }
}
