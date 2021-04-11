import React, { Component } from 'react'
import styled from 'styled-components'
import { Col } from '../common/StyledComponent'
import IconTime from './IconTime'

interface TimezoneProps {
    time: any;
    timezone: string;
}

export default class TimezoneItem extends Component<TimezoneProps> {
    render() {

        return (<Container>

            <IconTime>
                {this.props.time.tz(this.props.timezone).format('HH:mm')}
            </IconTime>

            {parseTimezoneName(this.props.timezone)}
        </Container>)

    }
}

const Container = styled(Col)`
height:60px;
justify-content:space-between;
`
const parseTimezoneName = (timezone: string) => {
    return timezone.substring(timezone.lastIndexOf("/") + 1).replace("_", " ");
}