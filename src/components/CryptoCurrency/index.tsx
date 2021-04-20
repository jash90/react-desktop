import moment from 'moment-timezone';
import React, { Component } from 'react';
import { CryptoCurrencyModel } from '../../models';
import { PriceItem } from '../common/PriceItem';
import { Container, Row } from '../common/StyledComponent';
import { HttpService } from '../../services/api';
import Time from '../WorldClock/Time';
import { EmptyComponent } from '../common/EmptyComponent';

export default class CryptoCurrency extends Component<{}, { cryptoRates: CryptoCurrencyModel[], sendDate: number }> {

    state = {
        cryptoRates: [{ symbol: "BTC", lastPrice: "0" }, { symbol: "ETH", lastPrice: "0" }, { symbol: "XLM", lastPrice: "0" }, { symbol: "DOT", lastPrice: "0" }, { symbol: "REEF", lastPrice: "0" }, { symbol: "AKRO", lastPrice: "0" }, { symbol: "DOGE", lastPrice: "0" }, { symbol: "LUNA", lastPrice: "0" }, { symbol: "CELR", lastPrice: "0" }],
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
                    {this.state.cryptoRates.length > 0 && this.state.cryptoRates.map((cryptoRate: CryptoCurrencyModel) => {
                        return (
                            <PriceItem symbol={cryptoRate.symbol} price={Number(cryptoRate.lastPrice)} dayLow={Number(cryptoRate.lowPrice)} dayHigh={Number(cryptoRate.highPrice)} changesPercentage={Number(cryptoRate.priceChangePercent)} key={cryptoRate.symbol} />
                        )
                    })}
                    {this.state.cryptoRates.length === 0 && <EmptyComponent />}
                </Row>
            </Container>
        )
    }
}