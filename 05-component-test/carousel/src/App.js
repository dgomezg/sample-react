import React from 'react';
import logo from './logo.svg';
import './App.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AwesomeSlider>
          <div data-src={process.env.PUBLIC_URL + '/img/screen1.png'}></div>
          <div data-src={process.env.PUBLIC_URL + '/img/Screen2.png'}></div>
          <div data-src={process.env.PUBLIC_URL + '/img/Screen3.png'}></div>
          <div data-src={process.env.PUBLIC_URL + '/img/Screen4.png'}></div>
        </AwesomeSlider>
      </header>
    </div>
  );
}

export default App;
