import React, { Component } from 'react'
import { Contener, EmptyItem, Row } from '../StyledComponent'
import moment from 'moment-timezone';
import styled from 'styled-components';
import Time from './Time';
import TimezoneItem from './TimezoneItem';

export default class Clock extends Component<{}, { time: any }> {
    timerID: any;
    timezones: any = ["America/Los_Angeles", "Australia/Sydney", "Europe/Berlin", "America/New_York", "Europe/Moscow"];
    state = { time: moment() };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({ time: moment() }),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <Contener>
                <Time time={this.state.time} />
                <Row>
                    {this.timezones.map((timezone: any) => <TimezoneItem time={this.state.time} timezone={timezone} />)}
                </Row>
            </Contener>
        )
    }
}


