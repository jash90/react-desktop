import React from 'react';
import styled from "styled-components";
import { EmptyItem } from './components/common/StyledComponent';
import Clock from './components/WorldClock';
import CryptoCoin from './components/CryptoCoin';
import Currency from './components/Currency/index';
import StockMarket from './components/StockMarket';
import { FirebaseService } from './services/firebase/index';

function App() {
  FirebaseService.init();
  return (
    <Container>
      <Clock />
      <CryptoCoin />
      <Currency />
      <StockMarket />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
      <EmptyItem />
    </Container>
  );
}



export default App;

const Container = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:16px;
justify-content:space-evenly;
`;
