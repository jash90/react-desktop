import React from 'react';
import logo from './logo.svg';
import './App.css';
import { EmptyItem, Contener } from './components/StyledComponent';
import Clock from './components/WorldClock';

function App() {
  return (
    <Contener>
      <Clock />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
    </Contener>
  );
}

export default App;
