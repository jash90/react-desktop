export interface CurrencyModel {
    mid: number;
    code: string;
}

export interface DefaultCurrencyModel {
    price: number;
    symbol: string;
    day?: number;
    month?: number;
    year?: number;
    changesPercentage?: number;
}

export interface CryptoCurrencyModel {
    priceChange?: number;
    priceChangePercent?: number;
    highPrice?: number;
    lowPrice?: number;
    lastPrice?: number;
    symbol: string;
}

export interface StockMarketModel extends DefaultCurrencyModel {
    name: string;
}

export interface ETFModel extends StockMarketModel {
    changesPercentage?: number;
}

export interface FirebaseDataModel {
    data: any[];
    sendDate: number;
    nextPage: boolean;
}