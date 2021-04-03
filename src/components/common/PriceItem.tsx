import React, { useCallback } from 'react';
import { Col } from './StyledComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

export const PriceItem: React.FC<{ symbol: string, price: string }> = ({ symbol, price }) => {

    const formatPrice = useCallback((price: number) => {
        if (price > 100)
            return price.toFixed(0);
        if (price > 1)
            return price.toFixed(2);
        return price.toFixed(3);
    }, []);

    return (

        <Col>
            {Number(price) === 0 && <CircularProgress size={30}/>}
            {Number(price) > 0 && <img src={`https://cryptoicon-api.vercel.app/api/icon/${String(symbol).toLowerCase()}`} alt="cryptocurrency-symbol" width="30" height="30" />}
            <span>{symbol}</span>
            <span>{formatPrice(Number(price))}</span>
        </Col>

    )

}