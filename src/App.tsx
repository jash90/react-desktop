import React from 'react';
import './App.css';
import { EmptyItem, Contener } from './components/StyledComponent';
import Clock from './components/WorldClock';
import CryptoCoin from './components/CryptoCoin';
import Currency from './components/Currency/index';

function App() {
  return (
    <Contener>
      <Clock />
      <CryptoCoin />
      <Currency />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
    </Contener>
  );
}

export default App;
