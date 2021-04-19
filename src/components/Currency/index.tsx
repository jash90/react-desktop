import moment from 'moment-timezone';
import React, { Component } from 'react';
import { DefaultCurrencyModel } from '../../models';
import { PriceItem } from '../common/PriceItem';
import { Container, Row } from '../common/StyledComponent';
import Time from '../WorldClock/Time';
import { HttpService } from '../../services/api/index';
import { EmptyComponent } from '../common/EmptyComponent';

export default class Currency extends Component<{}, { rates: DefaultCurrencyModel[], sendDate: number }> {

    state = {
        rates: [{ symbol: "USD", price: 0 }, { symbol: "EUR", price: 0 }, { symbol: "CHF", price: 0 }, { symbol: "GBP", price: 0 }, { symbol: "JPY", price: 0 }, { symbol: "CNY", price: 0 },],
        sendDate: Date.now()
    }

    async componentDidMount() {
        const rates = await HttpService.getCurrenciesPrices(this.state.rates);
        this.setState({ rates: rates.data, sendDate: rates.sendDate });
    }

    render() {
        return (
            <Container>
                <Time time={moment(this.state.sendDate)} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.rates.length > 0 && this.state.rates.map((currency: DefaultCurrencyModel) => {
                        return (
                            <PriceItem {...currency} key={currency.symbol} />
                        )
                    })}
                    {this.state.rates.length === 0 && <EmptyComponent />}
                </Row>
            </Container>
        )
    }
}