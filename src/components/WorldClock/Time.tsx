import React, { Component } from 'react'
import { FaClock } from 'react-icons/fa'
import styled from 'styled-components'
import IconTime from './IconTime'

interface TimeProps {
    time: any
    formatTime?:string
}

export default class Time extends Component<TimeProps> {
    render() {
        return (
            <ContenerDateTime>
                {this.props.time.format('DD.MM.YYYY')}
                <IconTime>
                    {this.props.time.format(this.props.formatTime ? this.props.formatTime : 'dddd HH:mm:ss')}
                </IconTime>
            </ContenerDateTime>
        )
    }
}

const ContenerDateTime = styled.div`
display:flex;
flex:1;
justify-content:flex-end;
flex-direction:row;
`