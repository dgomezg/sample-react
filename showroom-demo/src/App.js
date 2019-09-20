import React from 'react';
import TravelSelector from './components/TravelSelector/TravelSelector';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Header-banner</div>
          <TravelSelector/>
          <div>Travel detail</div>
      </header>
    </div>
  );
}

export default App;
