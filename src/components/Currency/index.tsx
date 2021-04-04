import axios from 'axios';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import { CURRENCY_URL } from '../../utils/Const';
import { PriceItem } from '../common/PriceItem';
import { Contener, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';

export default class Currency extends Component<{}, { rates: any[] }> {

    state = {
        rates: [{ code: "USD", mid: 0 }, { code: "EUR", mid: 0 }, { code: "CHF", mid: 0 }, { code: "GBP", mid: 0 }, { code: "JPY", mid: 0 }, { code: "CNY", mid: 0 },]
    }

    async componentDidMount() {
        const { data } = await axios.get(`${CURRENCY_URL}`);
        const rates = data[0].rates.filter((currency: any) => this.state.rates.map((rate: any) => rate.code).includes(currency.code))
        this.setState({ rates });
    }

    render() {
        return (
            <Contener>
                <Time time={moment()} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.rates.map((currency: any) => {
                        return (
                            <PriceItem symbol={currency.code} price={currency.mid} />
                        )
                    })}
                </Row>
            </Contener>
        )
    }
}