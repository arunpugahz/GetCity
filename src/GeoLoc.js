import React from 'react';
import { API_Key } from './config';
export default class GelLocation extends React.Component {
  constructor() {
    super();

    this.state = {
      latitude: '',
      longitude: '',
      city: '',
    };

    this.getMyLocation = this.getMyLocation.bind(this);
  }

  componentDidMount() {
    this.getMyLocation();
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          this.setState({
            latitude: 'err-latitude',
            longitude: 'err-longitude',
          });
        }
      );
    }
  }

  getAddress = (latitude, longitude) => {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      var method = 'GET';
      var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_Key}`;
      var async = true;

      request.open(method, url, async);
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
            resolve(address);
          } else {
            reject(request.status);
          }
        }
      };
      request.send();
    });
  };

  getCity = () => {
    this.getAddress(this.state.latitude, this.state.longitude)
      .then(data => {
        const { address_components } = data;
        const cityObject = address_components[address_components.length - 3];
        this.setState({
          city: cityObject.long_name,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { latitude, longitude, city } = this.state;

    return (
      <div>
        <h2>latitude: {latitude}</h2>
        <h2>longitude: {longitude}</h2>
        <button onClick={this.getMyLocation}>Press ME</button>
        <button onClick={this.getCity}>Press to get city</button>
        <h1>City: {city}</h1>
      </div>
    );
  }
}
