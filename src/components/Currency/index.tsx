import axios from 'axios';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import { PriceItem } from '../common/PriceItem';
import { Contener, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';

export default class Currency extends Component<{}, { rates: any[] }> {
    public currencies: string[] = ["USD", "EUR", "CHF", "GBP", "JPY", "CNY"]

    state = {
        rates: []
    }

    async componentDidMount() {
        const { data } = await axios.get("https://api.nbp.pl/api/exchangerates/tables/A?format=json");
        const rates = data[0].rates.filter((currency: any) => this.currencies.includes(currency.code))
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