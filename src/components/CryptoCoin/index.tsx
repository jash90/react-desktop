import axios from 'axios';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import { DefaultCurrencyModel } from '../../models';
import { CRYPTO_CURRENCY_URL } from '../../utils/Const';
import { PriceItem } from '../common/PriceItem';
import { Contener, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';

export default class CryptoCoin extends Component<{}, { cryptoRates: DefaultCurrencyModel[] }> {

    state = {
        cryptoRates: [{ symbol: "BTC", price: 0 }, { symbol: "ETH", price: 0 }, { symbol: "XLM", price: 0 }, { symbol: "DOT", price: 0 }, { symbol: "REEF", price: 0 }, { symbol: "AKRO", price: 0 }, { symbol: "DOGE", price: 0 }, { symbol: "LUNA", price: 0 }, { symbol: "CELR", price: 0 }]
    }

    async componentDidMount() {
        let { data } = await axios.get(`${CRYPTO_CURRENCY_URL}`);
        data = data.map((crypto: DefaultCurrencyModel) => {
            return { symbol: String(crypto.symbol).replace("USDT", ""), price: crypto.price }
        })
        this.setState({ cryptoRates: data.filter((crypto: DefaultCurrencyModel) => this.state.cryptoRates.map((rate: DefaultCurrencyModel) => rate.symbol).includes(crypto.symbol)) });
    }

    render() {
        return (
            <Contener>
                <Time time={moment()} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.cryptoRates.map((cryptoRate: DefaultCurrencyModel) => {
                        return (
                            <PriceItem symbol={cryptoRate.symbol} price={cryptoRate.price} />
                        )
                    })}
                </Row>
            </Contener>
        )
    }
}