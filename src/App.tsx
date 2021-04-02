import React from 'react';
import './App.css';
import { EmptyItem, Contener } from './components/StyledComponent';
import Clock from './components/WorldClock';
import CryptoCoin from './components/CryptoCoin';

function App() {
  return (
    <Contener>
      <Clock />
      <CryptoCoin />
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
