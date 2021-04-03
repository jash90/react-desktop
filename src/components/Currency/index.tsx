import React, { Component } from 'react'
import { Col, Contener, EmptyItem, Row } from '../StyledComponent'
import moment from 'moment-timezone';
import styled from 'styled-components';
import axios from 'axios';
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
                            <Col>
                                <img src={`https://cryptoicon-api.vercel.app/api/icon/${String(currency.code).toLowerCase()}`} alt="currency-symbol" width="30" height="30" />
                                <span>{currency.code}</span>
                                <span>{Number(currency.mid).toFixed(2)}</span>
                            </Col>
                        )
                    })}
                </Row>
            </Contener>
        )
    }
}