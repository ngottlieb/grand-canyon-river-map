'use strict';

const rivermiles = require('rivermiles');
const camps = require('camps');
const L = require('leaflet');

const Map = {
	init() {
		this.map = L.map('map').setView([36.865, -111.587], 13);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    attribution: 'hello',
				minZoom: 10,
		    id: 'mapbox.outdoors',
		    accessToken: 'pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqYjVlMmJlazhmYm4yd3J6Zm0wbjF0bnkifQ.WY_Tmu_nZtiUe4on-Gk3zA'
		}).addTo(this.map);
		this.loadData();
	},
	
	loadData() {
		this.riverMilesLayer = L.geoJson(rivermiles.rivermiles, {
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {
					icon: L.divIcon({
						className: 'rivermile-label',
						html: "<span>" + feature.properties.TENTH_MILE_LABEL + "</span>"
					})
				});
			}
		});
		this.riverMilesLayer.addTo(this.map);
		
		this.loadCamps();
	},
	
	loadCamps() {
		this.campsLayer = L.geoJson(camps.camps, {
			onEachFeature: Map.onEachCamp
		});
		this.campsLayer.addTo(this.map);
	},
	
	onEachCamp(feature, layer) {
		layer.bindTooltip(Map.getCampDescription(feature));
	},
	
	getCampDescription(feature) {
		var output = "<h3>" + feature.properties.CAMP_NAME + " - Mile " + String(feature.properties.GCMRC_MILE.toFixed(1)) + "</h3>";
		return output;
	}
	
};

module.exports = Map;