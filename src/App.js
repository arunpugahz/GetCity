import React from 'react';
import './App.css';
import GeloLoc from './GeoLoc';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GeloLoc />
        </header>
      </div>
    );
  }
}

export default App;
