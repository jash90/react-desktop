import moment from 'moment-timezone';
import React, { Component } from 'react';
import { StockMarketModel } from '../../models';
import { PriceItem } from '../common/PriceItem';
import { Container, Row } from '../common/StyledComponent';
import { HttpService } from '../../services/api';
import Time from '../WorldClock/Time';
import { EmptyComponent } from '../common/EmptyComponent';

export default class StockMarket extends Component<{}, { tickers: StockMarketModel[] }> {

    state = {
        tickers: [{ symbol: "AAPL", price: 0, name: "Apple" }, { symbol: "GOOGL", price: 0, name: "Google" }, { symbol: "TSLA", price: 0, name: "Tesla" }, { symbol: "MSFT", price: 0, name: "Microsoft" }, { symbol: "GME", price: 0, name: "GameStop" }]
    }

    async componentDidMount() {
        const tickers = await HttpService.getStockMarketPrices(this.state.tickers);
        this.setState({ tickers });
    }

    render() {
        return (
            <Container>
                <Time time={moment()} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.tickers.length > 0 && this.state.tickers.map((currency: StockMarketModel) => {
                        return (
                            <PriceItem symbol={currency.symbol} price={currency.price} name={currency.name} />
                        )
                    })}
                    {this.state.tickers.length === 0 && <EmptyComponent />}
                </Row>
            </Container>
        )
    }
}