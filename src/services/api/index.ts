import { CurrencyModel, DefaultCurrencyModel, StockMarketModel } from "../../models";
import axios from 'axios';
import { FirebaseService } from "../firebase";
import { CRYPTOCURRENCIES_CONTAINER, CRYPTO_CURRENCY_URL, CURRENCIES_CONTAINER, CURRENCY_URL, MARKET_STOCK_URL, REFRESH_TIME, STOCK_MARKET_CONTAINER } from "../../utils/Const";

export class HttpService {
    public static async getCryptoCurrenciesPrices(cryptoList: DefaultCurrencyModel[]) {
        let data: any = [];
        try {
            let lastData = await FirebaseService.downloadLatestData(CRYPTOCURRENCIES_CONTAINER);

            if (!lastData.sendDate || Date.now() - lastData.sendDate > REFRESH_TIME) {

                const response = await axios.get(`${CRYPTO_CURRENCY_URL}`);

                await FirebaseService.cacheData(CRYPTOCURRENCIES_CONTAINER, { data: response.data, sendDate: Date.now() });

                data = response.data;

            } else {
                data = lastData.data;
            }

            data = data.map((crypto: DefaultCurrencyModel) => {
                return { symbol: String(crypto.symbol).replace("USDT", ""), price: crypto.price }
            }).filter((crypto: DefaultCurrencyModel) => !!cryptoList.find(c => c.symbol === crypto.symbol))

        } catch (error) {
            console.log({ error })
            data = [];
        }

        return data;
    }

    public static async getCurrenciesPrices(currenciesList: DefaultCurrencyModel[]) {
        let data: any = [];
        try {
            let lastData = await FirebaseService.downloadLatestData(CURRENCIES_CONTAINER);

            if (!lastData.sendDate || Date.now() - lastData.sendDate > REFRESH_TIME) {

                const response = await axios.get(`${CURRENCY_URL}`);

                data = response.data[0].rates.map((currency: CurrencyModel) => {
                    return { symbol: currency.code, price: currency.mid }
                })

                await FirebaseService.cacheData(CURRENCIES_CONTAINER, { data, sendDate: Date.now() });

            } else {
                data = lastData.data;
            }

            data = data.filter((currency: DefaultCurrencyModel) => !!currenciesList.find(c => c.symbol === currency.symbol));
        } catch (error) {
            console.log({ error })
            data = [];
        }

        return data;
    }


    public static async getStockMarketPrices(tickersList: StockMarketModel[]) {
        let data: any = [];
        try {

            let lastData = await FirebaseService.downloadLatestData(STOCK_MARKET_CONTAINER);

            if (!lastData.sendDate || Date.now() - lastData.sendDate > REFRESH_TIME) {

                const response = await axios.get(`${MARKET_STOCK_URL}?apikey=${process.env.REACT_APP_MARKET_STOCK_API_KEY}`);

                data = response.data;

                data = data.filter((item:any, index:number)=> index < 10000);

                await FirebaseService.cacheData(STOCK_MARKET_CONTAINER, { data, sendDate: Date.now() });

            } else {
                data = lastData.data;
            }

            data = data.filter((t: StockMarketModel) => !!tickersList.find(ticker => ticker.symbol === t.symbol)).map((ticker: StockMarketModel) =>{
                return {symbol:ticker.symbol, price:ticker.price, name: tickersList.find(t => t.symbol === ticker.symbol)?.name};
            })

        } catch (error) {
            console.log({ error })
            data = [];
        }

        return data;
    }


}