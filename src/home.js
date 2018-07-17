/**
 * @file Sets up the home page of the app after successful login. Displays
 * a list of all documents owned by the user.
 */

import React from 'react';
import HomeBar from './homebar.js';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <HomeBar redirect={this.props.redirect} />
    );
  }
}
