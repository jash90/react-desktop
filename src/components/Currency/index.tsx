import React, { Component } from 'react'
import { EmptyItem } from '../StyledComponent'
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
        const { data } = await axios.get("http://api.nbp.pl/api/exchangerates/tables/A?format=json");
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
flex-wrap: wrap;

`