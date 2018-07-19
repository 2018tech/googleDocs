/**
 * @file Top-level React file. Sets up a collaborative rich-text editing desktop application with Electron.
 * @author Raj Kane
 * @author Jon Lee
 * @author Henry Gaskin
 * @author Anshul Nanda
 */

import React from 'react';
import Document from './document.js';
import Home from './home.js';
import Page2 from './page2.js';
import Login from './login.js';
import Register from './register.js';
import CreateDocument from './CreateDocument.jsx';

export default class App extends React.Component {
  /**
   * @class Represents the desktop application.
   */
  constructor(props) {
    super(props);
    this.state = {currentPage: "Home"};
    this.redirect = this.redirect.bind(this);
  };

  redirect(page, options) {
    /** Redirect the application to a specified page.
     * @param page - A page to which the application is to redirect.
     */
    this.setState({currentPage: page, options: options})
  }

  render() {
    return (
      <div>

        {this.state.currentPage === 'Home' ? <Home redirect={this.redirect} app={this}/>: null}
        {this.state.currentPage === "Document" ? <Document options={this.state.options} redirect={this.redirect} app={this}/>: null}
        {this.state.currentPage === 'Page2' ? <Page2 redirect={this.redirect}/> : null}
        {this.state.currentPage === 'Login' ? <Login redirect={this.redirect} app={this}/> : null}
        {this.state.currentPage === 'Register' ? <Register redirect={this.redirect} app={this}/> : null}
        {this.state.currentPage === 'CreateDocument' ? <CreateDocument redirect={this.redirect} app={this}/> : null}


      </div>
    );
  }
}
