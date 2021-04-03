import axios from 'axios';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import { PriceItem } from '../common/PriceItem';
import { Contener, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';

export default class CryptoCoin extends Component<{}, { cryptoRates: any[] }> {
    public cryptocurrencies: string[] = ["BTCUSDT", "ETHUSDT", "XLMUSDT", "DOTUSDT", "REEFUSDT", "AKROUSDT", "DOGEUSDT", "LUNAUSDT", "CELRUSDT"]
    state = {
        cryptoRates: []
    }

    async componentDidMount() {
        const { data } = await axios.get("https://api.binance.com/api/v3/ticker/price");
        this.cryptocurrencies.forEach(crypto => {
            const cryptoPrice = data.find((cryptoRate: any) => cryptoRate.symbol === crypto)
            if (cryptoPrice) {
                cryptoPrice.symbol = cryptoPrice.symbol.replace("USDT", "");
                const cryptoRates: any[] = this.state.cryptoRates;
                cryptoRates.push(cryptoPrice);
                this.setState({ cryptoRates });
            }
        });
    }

    render() {
        return (
            <Contener>
                <Time time={moment()} formatTime={'dddd HH:mm'}/>
                <Row>
                    {this.state.cryptoRates.map((cryptoRate: any) => {
                        return (
                            <PriceItem symbol={cryptoRate.symbol} price={cryptoRate.price}/>
                        )
                    })}
                </Row>
            </Contener>
        )
    }
}