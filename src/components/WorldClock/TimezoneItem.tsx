import React, { Component } from 'react'
import IconTime from './IconTime'
import styled from 'styled-components'

interface TimezoneProps{
    time:any;
    timezone:string;
}

export default class TimezoneItem extends Component<TimezoneProps> {
    render() {

        return (<Contener>

            <IconTime>
            {this.props.time.tz(this.props.timezone).format('HH:mm')}
            </IconTime>

            {parseTimezoneName(this.props.timezone)}
        </Contener>)

    }
}

const Contener = styled.div`
display:flex;
align-items:center;
width:100px;
flex-direction: column;
justify-content:space-between;
text-align:center;
`
const parseTimezoneName = (timezone:string) => {
    return timezone.substring(timezone.lastIndexOf("/")+1).replace("_"," ");
}