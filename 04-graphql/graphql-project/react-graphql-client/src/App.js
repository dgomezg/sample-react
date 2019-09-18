import React from 'react';
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import './App.css';

function App() {
  return (
    <div className="App">
        <MuiThemeProvider>
          <AppBar title="GraphQL React" />
          <p>BooksComponent</p>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
