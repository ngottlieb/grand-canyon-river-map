import React from 'react';

export default class InfoDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.closeDisplay = this.closeDisplay.bind(this);
  }
  
  closeDisplay() {
    this.props.updateDisplayObject(null);
  }
  
  render() {
    if (!this.props.displayObject) {
      return null;
    }

    return (
      <div className='info-display'>
        <CloseDisplayButton closeDisplay={this.closeDisplay} />
        <DetailView displayObject={this.props.displayObject} />
      </div>
    );
  }
}

class CloseDisplayButton extends React.Component {
  render() {
    return (
      <button
        className='close-display'
        onClick={(ev) => {this.props.closeDisplay()}}>
        X
      </button>
    );
  }
}

class DetailView extends React.Component {
  render() {
    if (this.props.displayObject.properties.CAMP_NAME) {
      return (
        <CampDetail camp={this.props.displayObject.properties} />
      );
    } else if (this.props.displayObject.properties.RAPID) {
      return <RapidDetail rapid={this.props.displayObject.properties} />;
    }
    return (
      <div>{JSON.stringify(this.props.displayObject)}</div>
    );
  }
}

class CampDetail extends React.Component {
  render() {
    const camp = this.props.camp;
    const attributes = {
      camp_size: camp.NPS_SIZE,
      alternate_name: camp.ALT_1,
      martin_guidebook_page: camp.MARTIN_PAGE,
      belknap_guidebook_page: camp.BELKNAP_PAGE,
    };
    console.log(camp);
    return (
      <div className='object-detail'>
        <h3>{camp.CAMP_NAME} - Mile {camp.GCMRC_MILE.toFixed(1)}</h3>
        <DetailAttributes attributes={attributes} />
      </div>
    );
  }
}

class DetailAttributes extends React.Component {
  render() {
    const listEntries = []
    for (var key of Object.keys(this.props.attributes)) {
      if (this.props.attributes[key] && this.props.attributes[key].trim()) {
        listEntries.push(
          <dt key={key + '-key'}>{key.toProperCase()}</dt>,
          <dd key={key + '-val'}>{this.props.attributes[key]}</dd>
        );
      }
    }
    return (
      <dl>{listEntries}</dl>
    );
  }
}

class RapidDetail extends React.Component {
  render() {
    const rapid = this.props.rapid;
    return (
      <div className='object-detail'>
        <h3>{rapid.RAPID}</h3>
      </div>
    );
  }
}

String.prototype.toProperCase = function () {
    return this.replace(/\_/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};