export interface CurrencyModel {
    mid: number;
    code: string;
}

export interface DefaultCurrencyModel {
    price: number;
    symbol: string;
}

export interface StockMarketModel extends DefaultCurrencyModel {
    name: string;
}

export interface ETFModel extends StockMarketModel {
    changesPercentage?: number;
}