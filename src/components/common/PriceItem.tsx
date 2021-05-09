import React, { useCallback } from 'react';
import { Col } from './StyledComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { formatPrice as format } from '../../utils/Functions';

interface Props {
    symbol: string;
    price?: number;
    name?: string;
    etfName?: string;
    changesPercentage?: number;
    dayHigh?: number;
    dayLow?: number;
    yearHigh?: number;
    yearLow?: number;
    day?: number;
    month?: number;
    year?: number;
}

export const PriceItem: React.FC<Props> = ({ symbol, price, name, etfName, changesPercentage, dayHigh, dayLow, yearHigh, yearLow, day, month, year }) => {

    const formatPrice = useCallback((price: number) => {
        return format(price)
    }, []);

    return (

        <Col horizontal>
            {Number(price) === 0 && <CircularProgress size={30} />}
            {Number(price) > 0 && !name && <img src={`https://cryptoicon-api.vercel.app/api/icon/${String(symbol).toLowerCase()}`} alt="cryptocurrencies-symbol" width="30" height="30" />}
            {Number(price) > 0 && name && <img src={`https://logo.clearbit.com/${String(name).toLowerCase()}.com`} alt="stock-market-symbol" width="30" height="30" />}
            {!!etfName && <ETFName >{etfName}</ETFName>}
            <Symbol>{symbol}</Symbol>
            <span>{formatPrice(Number(price))}</span>
            {typeof changesPercentage !== "undefined" && <Percentage color={Number(changesPercentage) > 0 ? "green" : changesPercentage === 0 ? "yellow" : "red"} >{formatPrice(Number(changesPercentage)) + "%"}</Percentage>}
            {typeof dayLow !== "undefined" && <Percentage>{`DayLow: ${formatPrice(Number(dayLow))}`}</Percentage>}
            {typeof dayHigh !== "undefined" && <Percentage>{`DayHigh: ${formatPrice(Number(dayHigh))}`}</Percentage>}
            {typeof yearLow !== "undefined" && <Percentage>{`YearLow: ${formatPrice(Number(yearLow))}`}</Percentage>}
            {typeof yearHigh !== "undefined" && <Percentage>{`YearHigh: ${formatPrice(Number(yearHigh))}`}</Percentage>}
            {typeof day !== "undefined" && <Percentage>{`Day: ${formatPrice(Number(day))}`}</Percentage>}
            {typeof month !== "undefined" && <Percentage>{`Month: ${formatPrice(Number(month))}`}</Percentage>}
            {typeof year !== "undefined" && <Percentage>{`Year: ${formatPrice(Number(year))}`}</Percentage>}

        </Col>

    )

}

const ETFName = styled.span({
    fontSize: 12,
    textAlign: "center",
    flex: 1,
    width: 100,
})

const Symbol = styled.span({
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
})

const Percentage = styled.span(({ color }) => ({
    fontSize: 12,
    color: color
}));
