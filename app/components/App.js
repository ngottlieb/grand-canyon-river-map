import React from 'react';
import CanyonMap from './CanyonMap';
import InfoDisplay from './InfoDisplay';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // maintain the object in the "InfoDisplay" on the App state
    // pass callbacks down the heirarchy to update it
    this.state = {
      displayObject: null
    };
    this.updateDisplayObject = this.updateDisplayObject.bind(this);
  }
  
  render() {
    return (
      <div id='app'>
        <InfoDisplay
          displayObject={this.state.displayObject}
          updateDisplayObject={this.updateDisplayObject}
        />
        <CanyonMap updateDisplayObject={this.updateDisplayObject} />
      </div>
    );
  }
  
  updateDisplayObject(object) {
    this.setState({displayObject: object});
  }
}