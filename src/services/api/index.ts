import { CryptoCurrencyModel, CurrencyModel, DefaultCurrencyModel, ETFModel, StockMarketModel } from "../../models";
import axios from 'axios';
import { FirebaseService } from "../firebase";
import { CRYPTOCURRENCIES_CONTAINER, CRYPTO_CURRENCY_URL, CURRENCIES_CONTAINER, CURRENCY_URL, ETF_CONTAINER, ETF_URL, MARKET_STOCK_URL, REFRESH_TIME, STOCK_MARKET_CONTAINER } from "../../utils/Const";
import moment from "moment";
import { formatPrice } from "../../utils/Functions";

export class HttpService {
    public static async getCryptoCurrenciesPrices(cryptocurrenciesList: CryptoCurrencyModel[]) {
        return await HttpService.getPrices(CRYPTOCURRENCIES_CONTAINER, CRYPTO_CURRENCY_URL, HttpService.filterCryptoCurrencies, cryptocurrenciesList);
    }

    public static async getCurrenciesPrices(currenciesList: DefaultCurrencyModel[]) {
        let data: any = { data: [], sendDate: Date.now() };
        try {
            let lastData = await FirebaseService.downloadLatestData(CURRENCIES_CONTAINER);

            if (!lastData.sendDate || Date.now() - lastData.sendDate > REFRESH_TIME) {

                const response = await axios.get(`${HttpService.generateCurrencyURL()}`);

                data.data = HttpService.formatResponseCurrencies(response.data);

                const day = await HttpService.getCurrencyWithDate(moment().add(-1, "day").toISOString());

                const month = await HttpService.getCurrencyWithDate(moment().add(-1, "month").toISOString());

                const year = await HttpService.getCurrencyWithDate(moment().add(-1, "year").toISOString());

                data.data = data.data.map((currency: DefaultCurrencyModel) => {
                    console.log({ ...currency, day: day.find(c => c.symbol === currency.symbol)?.price, month: month.find(c => c.symbol === currency.symbol)?.price, year: year.find(c => c.symbol === currency.symbol)?.price });

                    const dayPrice = day.find(c => c.symbol === currency.symbol)?.price;
                    const monthPrice = month.find(c => c.symbol === currency.symbol)?.price;
                    const yearPrice = year.find(c => c.symbol === currency.symbol)?.price;

                    return { ...currency, day: dayPrice, month: monthPrice, year: yearPrice, changesPercentage: Number(formatPrice(currency.price)) / Number(formatPrice(Number(dayPrice))) - 1 }
                });

                await FirebaseService.cacheData(CURRENCIES_CONTAINER, data);

            } else {
                data = lastData;
            }

            data.data = HttpService.filterCurrencies(data.data, currenciesList);

        } catch (error) {
            console.log({ error: error, CURRENCIES_CONTAINER })
        }

        return data;
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

            data.data = filterFunction(data.data, filterArray);

        } catch (error) {
            console.log({ firestoreContainer })
        }

        return data;
    }

    private static filterCryptoCurrencies(cryptocurrenciesList: CryptoCurrencyModel[], filterCryptocurrenciesList: CryptoCurrencyModel[]) {
        return cryptocurrenciesList.map((crypto: CryptoCurrencyModel) => {
            return { ...crypto, symbol: String(crypto.symbol).replace("USDT", ""), }
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

    private static formatResponseCurrencies(data: any): DefaultCurrencyModel[] {
        return data[0].rates.map((currency: CurrencyModel) => {
            return { symbol: currency.code, price: currency.mid }
        })
    }

    private static formatStockMarket(data: any): StockMarketModel[] {
        return data.filter((item: any, index: number) => index < 10000);
    }

    private static generateCurrencyURL(date?: string): string {
        if (!date) {
            return CURRENCY_URL;
        }

        else {
            return `${CURRENCY_URL.replace("?format=json", "")}${moment(date).toISOString().substring(0, 10)}/?format=json`;
        }
    }

    private static async getCurrencyWithDate(date?: string) {
        let data = null;

        while (!data) {
            try {
                const response = await axios.get(`${HttpService.generateCurrencyURL(moment(date).toISOString())}`);
                data = response.data;
            } catch (error) {

            }
            date = moment(date).add(1, "day").toISOString();
        }

        return HttpService.formatResponseCurrencies(data);
    }

}