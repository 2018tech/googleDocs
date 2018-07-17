import React from 'react';

export default class HomeBar extends React.Component {
  render() {
    return(
      <div><h1 className='home'>Google Docs</h1>
        <div className="homebar">
          <button className="homebarhome" onClick={() => this.props.redirect('Home')}>Folders</button>
          <button onClick={() => this.props.redirect('Document')}>Document</button>
        </div>
      </div>
    )
  }
}
