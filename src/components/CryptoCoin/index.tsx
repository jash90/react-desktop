import React, { Component } from 'react'
import { EmptyItem } from '../StyledComponent'
import moment from 'moment-timezone';
import styled from 'styled-components';
import axios from 'axios';
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

    protected formatPrice(price: number) {
        if (price > 100)
            return price.toFixed(0);
        if (price > 1)
            return price.toFixed(2);
        return price.toFixed(3);
    }

    render() {
        return (
            <Contener>
                <Time time={moment()} formatTime={'dddd HH:mm'}/>
                <Row>
                    {this.state.cryptoRates.map((cryptoRate: any) => {
                        return (
                            <Col>
                                <img src={"https://cryptoicon-api.vercel.app/api/icon/" + String(cryptoRate.symbol).toLowerCase()} width="30" height="30" />
                                <span>{cryptoRate.symbol}</span>
                                <span>{this.formatPrice(Number(cryptoRate.price))}</span>
                            </Col>
                        )
                    })}
                </Row>
            </Contener>
        )
    }
}

const Contener = styled(EmptyItem)`
display:flex;
text-transform: capitalize;
font-family:monospace;
font-size:14px;
flex-direction: column;
justify-content:space-between;
`
const Col = styled.div`
display:flex;
flex:1;
flex-direction: column;
justify-content:center;
`
const Row = styled.div`
display:flex;
flex:1;
flex-direction: Row;
`