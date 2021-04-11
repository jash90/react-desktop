import React from 'react';
import styled from 'styled-components';

export const EmptyComponent: React.FC = () => {
    return (
        <Container>
            <span>Nie udało się pobrać danych.</span>
        </Container>
    )
}

const Container = styled.div({
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
})