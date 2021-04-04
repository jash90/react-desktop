import axios from 'axios';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import { CurrencyModel, DefaultCurrencyModel } from '../../models';
import { CURRENCY_URL } from '../../utils/Const';
import { PriceItem } from '../common/PriceItem';
import { Contener, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';

export default class Currency extends Component<{}, { rates: DefaultCurrencyModel[] }> {

    state = {
        rates: [{ symbol: "USD", price: 0 }, { symbol: "EUR", price: 0 }, { symbol: "CHF", price: 0 }, { symbol: "GBP", price: 0 }, { symbol: "JPY", price: 0 }, { symbol: "CNY", price: 0 },]
    }

    async componentDidMount() {
        const { data } = await axios.get(`${CURRENCY_URL}`);
        const rates = (data[0].rates.filter((currency: CurrencyModel) => this.state.rates.map((rate: DefaultCurrencyModel) => rate.symbol).includes(currency.code))).map((currency: CurrencyModel) => {
            return { symbol: currency.code, price: currency.mid }
        })
        this.setState({ rates });
    }

    render() {
        return (
            <Contener>
                <Time time={moment()} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.rates.map((currency: DefaultCurrencyModel) => {
                        return (
                            <PriceItem symbol={currency.symbol} price={currency.price} />
                        )
                    })}
                </Row>
            </Contener>
        )
    }
}