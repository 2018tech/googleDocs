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
import Login from './login.js';
import Register from './register.js';
import CreateDocument from './CreateDocument.jsx';
import ItemList from './itemlist.js';

export default class App extends React.Component {
  /**
   * @class Represents the desktop application.
   */
  constructor(props) {
    super(props);
    this.state = {currentPage: "Login"};
    this.redirect = this.redirect.bind(this);
  };
//page is like 'Home'
  redirect(page, options) {
    /** Redirect the application to a specified page.
     * @param page - A page to which the application is to redirect.
     */
    this.setState({currentPage: page, options: options})
  }
//options = this.state.options.doc (App's state)
//in document now, this.options = this.state.options
//so in document now, props.options.doc

//home에서 redirect을 쳐
//그게 일로 날라와,
// this.props.app.redirect("Document", {doc: document}
//그럼 Document 으로 배이지 돌리고, this.setState(options: {doc: document}; document, in this situation, is just the user's document
//그리고 여기서 document options = this.state.options 하면
//document 에서 이제 props.options으로 access 가능


//this.state.options === {doc: document}

  render() {
    return (
      <div>
        {this.state.currentPage === 'Register' ? <Register redirect={this.redirect} app={this}/> : null}
        {this.state.currentPage === 'Login' ? <Login redirect={this.redirect} app={this}/> : null}
        {this.state.currentPage === 'Home' ? <Home redirect={this.redirect} app={this}/>: null}
        {this.state.currentPage === "Document" ? <Document options={this.state.options} redirect={this.redirect} app={this}/>: null}
        {this.state.currentPage === 'CreateDocument' ? <CreateDocument redirect={this.redirect} app={this}/> : null}
        {this.state.currentPage === 'ItemList' ? <ItemList redirect={this.redirect} app={this}/> : null}
      </div>
    );
  }
}
