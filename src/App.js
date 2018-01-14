import React, { Component } from 'react';
import ImageDropzone from './ImageDropzone';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App subtle-gray-gradient">
        <h1 className="App-title"><span role="img">☕️</span></h1>
        <ImageDropzone />
      </div>
    );
  }
}

export default App;
