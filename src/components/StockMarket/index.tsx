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
        try {
            console.log(process.env)
            let { data } = await axios.get(`${MARKET_STOCK_URL}${(this.state.tickers.map(t => t.symbol)).join(",")}?apikey=${process.env.REACT_APP_MARKET_STOCK_API_KEY}`);
            data = data.map((stock: any) => {
                return { symbol: stock.symbol, price: stock.price, name: this.state.tickers.find(t => t.symbol === stock.symbol)?.name }
            })
            this.setState({ tickers: data })
        } catch (err) {
            console.log(err);
        }
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