import React from 'react';
import './App.sass';
import WeatherItem from "./Components/WeatherItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherItem></WeatherItem>
      </header>
    </div>
  );
}

export default App;
