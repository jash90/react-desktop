import moment from 'moment-timezone';
import React, { Component } from 'react';
import { DefaultCurrencyModel } from '../../models';
import { PriceItem } from '../common/PriceItem';
import { Container, Row } from '../common/StyledComponent';
import { HttpService } from '../../services/api';
import Time from '../WorldClock/Time';
import { EmptyComponent } from '../common/EmptyComponent';

export default class CryptoCurrency extends Component<{}, { cryptoRates: DefaultCurrencyModel[], sendDate: number }> {

    state = {
        cryptoRates: [{ symbol: "BTC", price: 0 }, { symbol: "ETH", price: 0 }, { symbol: "XLM", price: 0 }, { symbol: "DOT", price: 0 }, { symbol: "REEF", price: 0 }, { symbol: "AKRO", price: 0 }, { symbol: "DOGE", price: 0 }, { symbol: "LUNA", price: 0 }, { symbol: "CELR", price: 0 }],
        sendDate: Date.now(),
    }

    async componentDidMount() {
        const cryptoRates = await HttpService.getCryptoCurrenciesPrices(this.state.cryptoRates);
        this.setState({ cryptoRates: cryptoRates.data, sendDate: cryptoRates.sendDate });
    }

    render() {
        return (
            <Container>
                <Time time={moment(this.state.sendDate)} formatTime={'dddd HH:mm'} />
                <Row>
                    {this.state.cryptoRates.length > 0 && this.state.cryptoRates.map((cryptoRate: DefaultCurrencyModel) => {
                        return (
                            <PriceItem {...cryptoRate} key={cryptoRate.symbol} />
                        )
                    })}
                    {this.state.cryptoRates.length === 0 && <EmptyComponent />}
                </Row>
            </Container>
        )
    }
}