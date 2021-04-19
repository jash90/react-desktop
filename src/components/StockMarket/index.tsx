import moment from 'moment-timezone';
import React, { Component } from 'react';
import { StockMarketModel } from '../../models';
import { PriceItem } from '../common/PriceItem';
import { Container, Row } from '../common/StyledComponent';
import { HttpService } from '../../services/api';
import Time from '../WorldClock/Time';
import { EmptyComponent } from '../common/EmptyComponent';

export default class StockMarket extends Component<{}, { tickers: StockMarketModel[], sendData: number }> {

    state = {
        tickers: [{ symbol: "AAPL", price: 0, name: "Apple" }, { symbol: "GOOGL", price: 0, name: "Google" }, { symbol: "TSLA", price: 0, name: "Tesla" }, { symbol: "MSFT", price: 0, name: "Microsoft" }, { symbol: "GME", price: 0, name: "GameStop" }, { symbol: "COIN", name: "Coinbase", price: 0 }],
        sendData: Date.now()
    }

    async componentDidMount() {
        const tickers = await HttpService.getStockMarketPrices(this.state.tickers);
        this.setState({ tickers: tickers.data, sendData: tickers.sendData });
    }

    render() {
        return (
            <Container>
                <Time time={moment(this.state.sendData)} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.tickers.length > 0 && this.state.tickers.map((currency: StockMarketModel) => {
                        return (
                            <PriceItem {...currency} key={currency.symbol} />
                        )
                    })}
                    {this.state.tickers.length === 0 && <EmptyComponent />}
                </Row>
            </Container>
        )
    }
}