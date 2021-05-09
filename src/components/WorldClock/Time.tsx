import React, { Component } from 'react'
import styled from 'styled-components'
import IconTime from './IconTime'

interface TimeProps {
    time: any
    formatTime?: string
}

export default class Time extends Component<TimeProps> {
    render() {
        return (
            <ContainerDateTime>
                {this.props.time.format('DD.MM.YYYY')}
                <IconTime>
                    {this.props.time.format(this.props.formatTime ? this.props.formatTime : 'dddd HH:mm:ss')}
                </IconTime>
            </ContainerDateTime>
        )
    }
}

const ContainerDateTime = styled.div`
display:flex;
height:30px;
justify-content:flex-end;
flex-direction:row;
`