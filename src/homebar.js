import React from 'react';
import {Navbar} from 'react-bootstrap';

export default class HomeBar extends React.Component {
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
        Signed in as: <Navbar.Link href="/">Henry Gaskin</Navbar.Link>
      </Navbar.Text>
      <Navbar.Text pullRight> <a href="/" >Log Out</a></Navbar.Text>
      </Navbar.Collapse>
      </Navbar>

        <div className="homebar">
          <button className="homebarhome" onClick={() => this.props.redirect('Home')}>Folders</button>
          <button onClick={() => this.props.redirect('Document')}>Document</button>
        </div>
      </div>
    )
  }
}
