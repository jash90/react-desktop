import moment from 'moment-timezone';
import React, { Component } from 'react';
import { ETFModel } from '../../models';
import { PriceItem } from '../common/PriceItem';
import { Container, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';
import { HttpService } from '../../services/api/index';
import { EmptyComponent } from '../common/EmptyComponent';

export default class ETF extends Component<{}, { rates: ETFModel[], sendDate: number }> {

  state = {
    rates: [
      {
        symbol: 'NOBL',
        name: 'ProShares S&P 500 Dividend Aristocrats ETF',
        price: 88.81,
        changesPercentage: undefined
      },
      {
        symbol: 'BGLD',
        name: 'First Trust Exchange-Traded Fund - FT Cboe Vest Gold Strategy Quarterly Buffer ETF',
        price: 19.395,
        changesPercentage: undefined
      },
      {
        symbol: 'GSUS',
        name: 'Goldman Sachs MarketBeta US Equity ETF',
        price: 57.7433,
        changesPercentage: undefined
      },
      {
        symbol: 'IEO',
        name: 'iShares U.S. Oil & Gas Exploration & Production ETF',
        price: 47.74,
        changesPercentage: undefined
      },
      {
        symbol: 'BBJP',
        name: 'JPMorgan BetaBuilders Japan ETF',
        price: 57.53,
        changesPercentage: undefined
      },
      {
        symbol: 'GSEE',
        name: 'Goldman Sachs MarketBeta Emerging Markets Equity ETF',
        price: 57.2734,
        changesPercentage: undefined
      },
      {
        symbol: 'DURA',
        name: 'VanEck Vectors Morningstar Durable Dividend ETF',
        price: 30.6754,
        changesPercentage: undefined
      },
      {
        symbol: 'IQDG',
        name: 'WisdomTree International Quality Dividend Growth Fund',
        price: 39.23,
        changesPercentage: undefined
      },
      {
        symbol: 'REGL',
        name: 'ProShares S&P MidCap 400 Dividend Aristocrats ETF',
        price: 72.072,
        changesPercentage: undefined
      },
      {
        symbol: 'SDVGX',
        name: 'Sit Dividend Growth Fund Class I',
        price: 16.9,
        changesPercentage: undefined
      },
      {
        symbol: 'OUSM',
        name: 'O&apos;Shares FTSE Russell Small Cap Quality Dividend ETF',
        price: 35.2,
        changesPercentage: undefined
      },
      {
        symbol: 'GSEW',
        name: 'Goldman Sachs Equal Weight U.S. Large Cap Equity ETF',
        price: 64.76,
        changesPercentage: undefined
      },
      {
        symbol: 'OILK',
        name: 'ProShares K-1 Free Crude Oil Strategy ETF',
        price: 56.7475,
        changesPercentage: undefined
      },
      {
        symbol: 'OEUR',
        name: "O'Shares FTSE Europe Quality Dividend ETF",
        price: 27.0523,
        changesPercentage: undefined
      },
      {
        symbol: 'DALT',
        name: 'Anfield Capital Diversified Alternatives ETF',
        price: 10.2023,
        changesPercentage: undefined
      },
      {
        symbol: 'KNG',
        name: 'CBOE Vest S&P 500 Dividend Aristocrats Target Income Index ETF',
        price: 52.4889,
        changesPercentage: undefined
      },
      {
        symbol: 'LEAD',
        name: 'Reality Shares Divcon Leaders Dividend ETF',
        price: 51.8298,
        changesPercentage: undefined
      },
      {
        symbol: 'RODE',
        name: 'Hartford Multifactor Diversified International ETF',
        price: 28.9601,
        changesPercentage: undefined
      },
      {
        symbol: 'GCOW',
        name: 'Pacer Global Cash Cows Dividend ETF',
        price: 31.525,
        changesPercentage: undefined
      },
      {
        symbol: 'TDV',
        name: 'ProShares S&P Technology Dividend Aristocrats ETF',
        price: 58.5018,
        changesPercentage: undefined
      },
      {
        symbol: 'IGRO',
        name: 'iShares International Dividend Growth ETF',
        price: 67.325,
        changesPercentage: undefined
      },
      {
        symbol: 'SMDV',
        name: 'ProShares Russell 2000 Dividend Growers ETF',
        price: 66.0682,
        changesPercentage: undefined
      },
      {
        symbol: 'GSST',
        name: 'Goldman Sachs Access Ultra Short Bond ETF',
        price: 50.755,
        changesPercentage: undefined
      },
      {
        symbol: 'EFAD',
        name: 'ProShares MSCI EAFE Dividend Growers ETF',
        price: 45.4963,
        changesPercentage: undefined
      },
      {
        symbol: 'TMDV',
        name: 'ProShares Russell US Dividend Growers ETF',
        price: 47.1343,
        changesPercentage: undefined
      },
      {
        symbol: 'KWT',
        name: 'VanEck Vectors Solar Energy ETF',
        price: 29.9975,
        changesPercentage: undefined
      },
      {
        symbol: 'XSHD',
        name: 'Invesco S&P SmallCap High Dividend Low Volatility ETF',
        price: 23.2188,
        changesPercentage: undefined
      },
      {
        symbol: 'DIVB',
        name: 'iShares U.S. Dividend and Buyback ETF',
        price: 38.2627,
        changesPercentage: undefined
      },
      {
        symbol: 'OUSA',
        name: "O'Shares FTSE U.S. Quality Dividend ETF",
        price: 41.34,
        changesPercentage: undefined
      },
      {
        symbol: 'EUDV',
        name: 'ProShares MSCI Europe Dividend Growers ETF',
        price: 49.9774,
        changesPercentage: undefined
      },
      {
        symbol: 'SULR',
        name: 'Guinness Atkinson Funds - SmartETFs Sustainable Energy II ETF',
        price: 31.0875,
        changesPercentage: undefined
      },
      {
        symbol: 'BBAX',
        name: 'JPMorgan BetaBuilders Developed Asia ex-Japan ETF',
        price: 59.24,
        changesPercentage: undefined
      },
      {
        symbol: 'DFND',
        name: 'Reality Shares Divcon Dividend Defender ETF',
        price: 37.4327,
        changesPercentage: undefined
      },
      {
        symbol: 'SLVP',
        name: 'iShares MSCI Global Silver and Metals Miners ETF',
        price: 16.17,
        changesPercentage: undefined
      },
      {
        symbol: 'GTIP',
        name: 'Goldman Sachs Access Inflation Protected USD Bond ETF',
        price: 56.9174,
        changesPercentage: undefined
      },
      {
        symbol: 'VWID',
        name: 'ETFis Series Trust I - Virtus WMC International Dividend ETF',
        price: 29.5454,
        changesPercentage: undefined
      },
      {
        symbol: 'IDV',
        name: 'iShares International Select Dividend ETF',
        price: 32.61,
        changesPercentage: undefined
      },
      {
        symbol: 'LVHI',
        name: 'Legg Mason International Low Volatility High Dividend ETF',
        price: 25.62,
        changesPercentage: undefined
      },
      {
        symbol: 'TCTL',
        name: 'Premise Capital Diversified Tactical ETF',
        price: 32.2052,
        changesPercentage: undefined
      },
      {
        symbol: 'IAUF',
        name: 'iShares Gold Strategy ETF',
        price: 54.4301,
        changesPercentage: undefined
      },
      {
        symbol: 'GSID',
        name: 'Goldman Sachs MarketBeta International Equity ETF',
        price: 56.5282,
        changesPercentage: undefined
      },
      {
        symbol: 'IGLD',
        name: 'Internet Gold - Golden Lines Ltd.',
        price: 20.47,
        changesPercentage: undefined
      },
      {
        symbol: 'EMDV',
        name: 'ProShares MSCI Emerging Markets Dividend Growers ETF',
        price: 60.2652,
        changesPercentage: undefined
      },
      {
        symbol: 'PICK',
        name: 'iShares MSCI Global Metals &amp; Mining Producers ETF',
        price: 45.86,
        changesPercentage: undefined
      },
      {
        symbol: 'IDHD',
        name: 'Invesco S&P International Developed High Dividend Low Volatility ETF',
        price: 27.3837,
        changesPercentage: undefined
      },
      {
        symbol: 'SDVSX',
        name: 'Sit Dividend Growth Fund Class S',
        price: 16.8,
        changesPercentage: undefined
      }
    ],
    sendDate: Date.now()
  }

  async componentDidMount() {
    const rates = await HttpService.getETFPrices(this.state.rates);
    this.setState({ rates: rates.data, sendDate: rates.sendDate });
  }

  render() {
    return (
      <Container>
        <Time time={moment(this.state.sendDate)} formatTime={'dddd HH:mm'} />
        <Row>
          {this.state.rates.length > 0 && this.state.rates.map((currency: ETFModel) => {
            const { name, ...etf } = currency;
            return (
              <PriceItem {...etf} etfName={name} key={currency.symbol} />
            )
          })}
          {this.state.rates.length === 0 && <EmptyComponent />}
        </Row>
      </Container>
    )
  }
}