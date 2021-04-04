import axios from 'axios';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import { MARKET_STOCK_URL } from '../../utils/Const';
import { PriceItem } from '../common/PriceItem';
import { Contener, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';



export default class StockMarket extends Component<{}, { tickers: any[] }> {

    state = {
        tickers: [{ symbol: "AAPL", price: 0, name: "Apple" }, { symbol: "GOOGL", price: 0, name: "Google" }, { symbol: "TSLA", price: 0, name: "Tesla" }, { symbol: "MSFT", price: 0, name: "Microsoft" }, { symbol: "GME", price: 0, name: "GameStop" }]
    }

    async componentDidMount() {
        let { data } = await axios.get(`${MARKET_STOCK_URL}${this.state.tickers.map(t => t.symbol)}`);
        data = data.data.map((stock: any) => {
            return { symbol: String(stock.symbol).replace("USDT", ""), price: `${(stock.high + stock.low) / 2}`, name: this.state.tickers.find(t => t.symbol === stock.symbol)?.name }
        })
        this.setState({ tickers: data })
    }

    render() {
        return (
            <Contener>
                <Time time={moment()} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.tickers.map((currency: any) => {
                        return (
                            <PriceItem symbol={currency.symbol} price={currency.price} name={currency.name} />
                        )
                    })}
                </Row>
            </Contener>
        )
    }
}