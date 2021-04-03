import React from 'react';
import styled from "styled-components";
import { EmptyItem } from './components/StyledComponent';
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

const Contener = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:16px;
justify-content:space-evenly;
`;
