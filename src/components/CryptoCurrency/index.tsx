import moment from "moment-timezone";
import React, { Component } from "react";
import { CryptoCurrencyModel } from "../../models";
import { PriceItem } from "../common/PriceItem";
import { Container, Row } from "../common/StyledComponent";
import { HttpService } from "../../services/api";
import Time from "../WorldClock/Time";
import { EmptyComponent } from "../common/EmptyComponent";

export default class CryptoCurrency extends Component<{}, { cryptoRates: CryptoCurrencyModel[]; sendDate: number }> {
    state = {
        cryptoRates: [
            { symbol: "BTC", lastPrice: 0 },
            { symbol: "ETH", lastPrice: 0 },
            { symbol: "XLM", lastPrice: 0 },
            { symbol: "DOT", lastPrice: 0 },
            { symbol: "REEF", lastPrice: 0 },
            { symbol: "AKRO", lastPrice: 0 },
            { symbol: "DOGE", lastPrice: 0 },
            { symbol: "LUNA", lastPrice: 0 },
            { symbol: "CELR", lastPrice: 0 },
            { symbol: "ATOM", lastPrice: 0 },
            { symbol: "OMG", lastPrice: 0 },
            { symbol: "NEO", lastPrice: 0 },
            { symbol: "LSK", lastPrice: 0 },
            { symbol: "IRIS", lastPrice: 0 },
            { symbol: "CHZ", lastPrice: 0 },
            { symbol: "BTT", lastPrice: 0 },
            { symbol: "1INCH", lastPrice: 0 },
            { symbol: "COTI", lastPrice: 0 },
            { symbol: "ENJ", lastPrice: 0 },
            { symbol: "TKO", lastPrice: 0 },
            { symbol: "HOT", lastPrice: 0 },
            { symbol: "FIO", lastPrice: 0 },
            { symbol: "CAKE", lastPrice: 0 },
            { symbol: "SOL", lastPrice: 0 },
            { symbol: "BURGER", lastPrice: 0 },
            { symbol: "UNI", lastPrice: 0 },
            { symbol: "THETA", lastPrice: 0 },
            { symbol: "TRX", lastPrice: 0 },
            { symbol: "EOS", lastPrice: 0 },
            { symbol: "MIOTA", lastPrice: 0 },
            { symbol: "CRO", lastPrice: 0 },
            { symbol: "WAVES", lastPrice: 0 },
            { symbol: "SUSHI", lastPrice: 0 },
            { symbol: "SC", lastPrice: 0 },
            {symbol: "FET", lastPrice: 0 },
            {symbol: "BTM", lastPrice: 0 },
            {symbol: "KAVA", lastPrice: 0 },
        ],
        sendDate: Date.now(),
    };

    async componentDidMount() {
        const cryptoRates = await HttpService.getCryptoCurrenciesPrices(this.state.cryptoRates);
        this.setState({ cryptoRates: cryptoRates.data, sendDate: cryptoRates.sendDate });
    }

    render() {
        return (
            <Container>
                <Time time={moment(this.state.sendDate)} formatTime={"dddd HH:mm"} />
                <Row>
                    {this.state.cryptoRates.length > 0 &&
                        this.state.cryptoRates.map((cryptoRate: CryptoCurrencyModel) => {
                            return (
                                <PriceItem
                                    symbol={cryptoRate.symbol}
                                    price={cryptoRate.lastPrice}
                                    dayLow={cryptoRate.lowPrice}
                                    dayHigh={cryptoRate.highPrice}
                                    changesPercentage={cryptoRate.priceChangePercent}
                                    key={cryptoRate.symbol}
                                />
                            );
                        })}
                    {this.state.cryptoRates.length === 0 && <EmptyComponent />}
                </Row>
            </Container>
        );
    }
}
