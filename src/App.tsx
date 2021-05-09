import React from 'react';
import styled from "styled-components";
import CryptoCurrency from './components/CryptoCurrency';
import Currency from './components/Currency/index';
import StockMarket from './components/StockMarket';
import { FirebaseService } from './services/firebase/index';
import ETF from './components/ETF';

function App() {
  FirebaseService.init();
  return (
    <Container>
      <CryptoCurrency />
      <Currency />
      <StockMarket />
      <ETF />
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
