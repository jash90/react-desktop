import { CryptoCurrencyModel, CurrencyModel, DefaultCurrencyModel, ETFModel, StockMarketModel } from "../../models";
import axios from 'axios';
import { FirebaseService } from "../firebase";
import { CRYPTOCURRENCIES_CONTAINER, CRYPTO_CURRENCY_URL, CURRENCIES_CONTAINER, CURRENCY_URL, ETF_CONTAINER, ETF_URL, MARKET_STOCK_URL, REFRESH_TIME, STOCK_MARKET_CONTAINER } from "../../utils/Const";

export class HttpService {
    public static async getCryptoCurrenciesPrices(cryptocurrenciesList: CryptoCurrencyModel[]) {
        return await HttpService.getPrices(CRYPTOCURRENCIES_CONTAINER, CRYPTO_CURRENCY_URL, HttpService.filterCryptoCurrencies, cryptocurrenciesList);
    }

    public static async getCurrenciesPrices(currenciesList: DefaultCurrencyModel[]) {
        return await HttpService.getPrices(CURRENCIES_CONTAINER, CURRENCY_URL, HttpService.filterCurrencies, currenciesList, HttpService.formatResponseCurrencies);
    }


    public static async getStockMarketPrices(stockMarketList: StockMarketModel[]) {
        return await HttpService.getPrices(STOCK_MARKET_CONTAINER, `${MARKET_STOCK_URL}?apikey=${process.env.REACT_APP_MARKET_STOCK_API_KEY}`, HttpService.filterStockMarket, stockMarketList, HttpService.formatStockMarket);
    }

    public static async getETFPrices(etfList: ETFModel[]) {
        return await HttpService.getPrices(ETF_CONTAINER, `${ETF_URL}?apikey=${process.env.REACT_APP_MARKET_STOCK_API_KEY}`, HttpService.filterETFMarket, etfList);
    }

    public static async getPrices(firestoreContainer: string, url: string, filterFunction: any, filterArray: any[], formatResponse?: any) {
        let data: any = { data: [], sendDate: Date.now() };
        try {
            let lastData = await FirebaseService.downloadLatestData(firestoreContainer);

            if (!lastData.sendDate || Date.now() - lastData.sendDate > REFRESH_TIME) {

                const response = await axios.get(`${url}`);

                if (formatResponse) {
                    data.data = formatResponse(response.data);
                } else {
                    data.data = response.data;
                }

                await FirebaseService.cacheData(firestoreContainer, data);

            } else {
                data = lastData;
            }

            console.log({ data: data.data })

            data.data = filterFunction(data.data, filterArray);

        } catch (error) {
            console.log({ firestoreContainer })
        }

        return data;
    }

    private static filterCryptoCurrencies(cryptocurrenciesList: CryptoCurrencyModel[], filterCryptocurrenciesList: CryptoCurrencyModel[]) {
        return cryptocurrenciesList.map((crypto: CryptoCurrencyModel) => {
            return { ...crypto, symbol: String(crypto.symbol).replace("USDT", ""),  }
        }).filter((crypto: CryptoCurrencyModel) => {
            return !!filterCryptocurrenciesList.find((c: any) => c.symbol === crypto.symbol)
        })
    }

    private static filterCurrencies(currencies: DefaultCurrencyModel[], filterCurrencies: DefaultCurrencyModel[]) {
        return currencies.filter((currency: DefaultCurrencyModel) => !!filterCurrencies.find(c => c.symbol === currency.symbol));
    }

    private static filterStockMarket(stockMarket: StockMarketModel[], filterStockMarket: StockMarketModel[]) {
        return stockMarket.filter((t: StockMarketModel) => !!filterStockMarket.find(ticker => ticker.symbol === t.symbol)).map((ticker: StockMarketModel) => {
            return { symbol: ticker.symbol, price: ticker.price, name: filterStockMarket.find(t => t.symbol === ticker.symbol)?.name };
        })
    }

    private static filterETFMarket(stockMarket: ETFModel[], filterStockMarket: ETFModel[]) {
        return stockMarket.filter((t: ETFModel) => !!filterStockMarket.find(ticker => ticker.symbol === t.symbol)).map((ticker: ETFModel) => {
            const { name, ...etf } = ticker;
            return { name: filterStockMarket.find(t => t.symbol === ticker.symbol)?.name, ...etf };
        })
    }

    private static formatResponseCurrencies(data: any) {
        return data[0].rates.map((currency: CurrencyModel) => {
            return { symbol: currency.code, price: currency.mid }
        })
    }

    private static formatStockMarket(data: any) {
        return data.filter((item: any, index: number) => index < 10000);
    }

}