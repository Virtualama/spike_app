'use strict';

require('font-awesome-webpack')
require('leaflet/dist/leaflet.css')
require('leaflet-routing-machine/dist/leaflet-routing-machine.css')

require('../css/app.css')
require('leaflet/dist/images/marker-icon.png')
require('leaflet/dist/images/marker-icon-2x.png')
require('leaflet/dist/images/marker-shadow.png')

const L = require('leaflet')
L.Routing = require('leaflet-routing-machine')

var serializeHTML = function(node){
  var wrapper = document.createElement('div')
  wrapper.appendChild(node)

  return wrapper.innerHTML
}

L.CustomMarker = L.Marker.extend({
  initialize: function(latlng, options, type, content){

    var htmlMarker = document.createElement('div')
    htmlMarker.classList.add('custom-marker')
    if (type)
      htmlMarker.classList.add(type)

    if (content) {
      var htmlContent = document.createElement('i')
      htmlContent.className = content.class
      htmlMarker.appendChild(htmlContent)
    }

    L.Marker.prototype.initialize.call(this, latlng, {
      icon: L.divIcon({
        html: serializeHTML(htmlMarker),
        className: 'custom-marker-wrapper',
        iconSize: [24, 24],
        iconAnchor: [12, 29]
      })
    })
  }
})

L.sourceMarker = function(latlng, options){
  return new L.CustomMarker(latlng, options, 'source', {class: 'fa fa-1x fa-child'})
}

L.destMarker = function(latlng, options){
  return new L.CustomMarker(latlng, options, 'destination', {class: 'fa fa-1x fa-street-view'})
}

document.addEventListener('DOMContentLoaded', function(){
  console.log(L.version)

  window.map = L.map('map', {
    center: [38.8145, 0.1081],
    zoom: 13,
    maxZoom: 16,
    minZoom: 13,
    doubleClickZoom: false,
    attributionControl: false
  })

  L.Icon.Default.imagePath = './build/images/'

  // L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  // L.tileLayer('./tiles/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  window.layerGroup = L.layerGroup()
  layerGroup.addTo(map)

  map.once('click', function(ev) {
    var firstClickedPoint = L.latLng(ev.latlng)

    // L.sourceMarker(firstClickedPoint, {
    //   title: ev.latlng,
    // }).addTo(layerGroup)

    map.once('click', function(ev) {
      var secondClickedPoint = L.latLng(ev.latlng)

      // L.destMarker(secondClickedPoint, {
      //   title: ev.latlng,
      // }).addTo(layerGroup)

      // L.polyline([firstClickedPoint, secondClickedPoint], {weight: 1}).addTo(map)

      // L.Routing.control({
      //   waypoints: [firstClickedPoint, secondClickedPoint],//.map((marker) => marker._latlng),
      //   profile: 'walking'
      // }).addTo(map);

      L.Routing.control({
        plan: L.Routing.plan([firstClickedPoint, secondClickedPoint], {
          createMarker: function(i, wp) {
            if (wp.latLng === firstClickedPoint)
              return L.sourceMarker(wp.latLng)

            if (wp.latLng === secondClickedPoint)
              return L.destMarker(wp.latLng)

            return new L.CustomMarker(wp.latLng, {} )
          },
          routeWhileDragging: true
        }),
        routeWhileDragging: true,
        routeDragTimeout: 250,
        showAlternatives: true,
        altLineOptions: {
          styles: [
            {color: 'black', opacity: 0.15, weight: 9},
            {color: 'white', opacity: 0.8, weight: 6},
            {color: 'blue', opacity: 0.5, weight: 2}
          ]
        }
      }).addTo(map)

    })

    // lastMarker.bindPopup('xxx')

    // L.Routing.control({
    //   waypoints: allCoords,//.map((marker) => marker._latlng),
    //   profile: 'walking'
    // }).addTo(map);
  })


  document.getElementById('clear').addEventListener('click', function(){
    layerGroup.clearLayers()
  })

  document.getElementById('log').addEventListener('click', function(){
    console.log(layerGroup.getLayers())
    var markers = layerGroup.getLayers()
    var markerLatLngs = markers.map( (marker) => marker._latlng )

    var bounds = L.latLngBounds(markerLatLngs)
    console.log(bounds)

    var rectangle = L.rectangle(bounds, {color: '#ff0000', weight: 1})
    rectangle.addTo(layerGroup)

    map.fitBounds(rectangle)

  })
})
