import React, { Component } from 'react'
import { FaClock } from 'react-icons/fa'
import styled from 'styled-components'

export default class IconTime extends Component {
    render() {
        return (
            <Contener>
            <Icon>
                <FaClock color="white" size="18" />
            </Icon>
            {this.props.children}
            </Contener>
        )
    }
}

const Icon = styled.div`
padding: 0px 5px;
`

const Contener  = styled.div`
display:flex;
flex-direction:row;
`;