import moment from 'moment-timezone';
import React, { Component } from 'react';
import { StockMarketModel } from '../../models';
import { PriceItem } from '../common/PriceItem';
import { Container, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';
import { HttpService } from '../../services/api/index';
import { EmptyComponent } from '../common/EmptyComponent';

export default class ETF extends Component<{}, { rates: StockMarketModel[], sendDate: number }> {

    state = {
        rates: [
            { symbol: "SPY", price: 0, name: "SPDR S&P 500 ETF                    " },
            { symbol: "QQQ", price: 0, name: "Invesco QQQ ETF                     " },
            { symbol: "VGT", price: 0, name: "Vanguard Information Technology ETF " },
            { symbol: "VUG", price: 0, name: "Vanguard Growth ETF                 " },
            { symbol: "SCHA", price: 0, name: "Schwab U.S. Small-Cap ETF          " },
            { symbol: "USMV", price: 0, name: "iShares MSCI USA Min Vol Factor ETF" },
            { symbol: "HDV", price: 0, name: "iShares Core High Dividend ETF      " },
            { symbol: "VEU", price: 0, name: "Vanguard FTSE All-World ex-US ETF   " },
            { symbol: "VWO", price: 0, name: "Vanguard FTSE Emerging Markets ETF  " },
            { symbol: "GLD", price: 0, name: "SPDR Gold Shares                  " }
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
                    {this.state.rates.length > 0 && this.state.rates.map((currency: StockMarketModel) => {
                        return (
                            <PriceItem symbol={currency.symbol} price={currency.price} key={currency.symbol} etfName={currency.name}/>
                        )
                    })}
                    {this.state.rates.length === 0 && <EmptyComponent />}
                </Row>
            </Container>
        )
    }
}