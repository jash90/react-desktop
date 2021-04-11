import React, { Component } from 'react'
import { FaClock } from 'react-icons/fa'
import styled from 'styled-components'

export default class IconTime extends Component {
    render() {
        return (
            <Container>
                <Icon>
                    <FaClock color="white" size="18" />
                </Icon>
                {this.props.children}
            </Container>
        )
    }
}

const Icon = styled.div`
padding: 0px 5px;
`

const Container = styled.div`
display:flex;
flex-direction:row;
`;