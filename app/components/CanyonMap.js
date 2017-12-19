import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { Rivermiles } from 'rivermiles';
import { Camps } from 'camps';
import { Rapids } from 'rapids';
import L from 'leaflet';

/*const Rivermiles = require('rivermiles');
const Camps = require('camps');
const L = require('leaflet');
const Rapids = require('rapids');*/

export default class CanyonMap extends React.Component {
  render() {
    const position = [36.865, -111.587];
    const zoom = 13;
    const map = (
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          accessToken="pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqYjVlMmJlazhmYm4yd3J6Zm0wbjF0bnkifQ.WY_Tmu_nZtiUe4on-Gk3zA"
          id="mapbox.outdoors"
          attribution="data <a href='https://www.gcmrc.gov/geospatial/default.aspx'>courtesy of the USGS and GCMRC</a>"
          minZoom={10}
        />
        <RiverMilesLayer />
        <CampsLayer />
        <RapidsLayer />
      </Map>
    );
    return map;
  }
}

class RiverMilesLayer extends React.Component {
  render() {
    return (
      <GeoJSON
        data={Rivermiles}
        pointToLayer={this.onPointToLayer}
      />
    );
  }
  
  onPointToLayer(feature, latlng) {
    return new L.Marker(latlng, {
      icon: L.divIcon({
        className: 'rivermile-label',
        html: "<span>" + feature.properties.TENTH_MILE_LABEL + "</span>"
      })
    });
  }
}

class CampsLayer extends React.Component {
  render() {
    return (
      <GeoJSON
        data={Camps}
        onEachFeature={this.onEachFeature}
      />
    );
  }
  
  onEachFeature(feature, layer) {
    layer.bindTooltip("<h3>" + feature.properties.CAMP_NAME + " - Mile " + String(feature.properties.GCMRC_MILE.toFixed(1)) + "</h3>");
  }
}

class RapidsLayer extends React.Component {
  render() {
    return (
      <GeoJSON
        data={Rapids}
        pointToLayer={this.onPointToLayer}
        />
    )
  }
  
  onPointToLayer(feature, latlng) {
    return new L.marker(latlng, {
      title: "<span>" + feature.properties.RAPID + "</span>"
    }).bindTooltip(feature.properties.RAPID);
  }
}