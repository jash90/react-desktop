import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseFirestore } from "@firebase/firestore-types";
import {
    CACHED_CONTAINER,
    CRYPTOCURRENCIES_CONTAINER,
    CURRENCIES_CONTAINER,
    ETF_CONTAINER,
    STOCK_MARKET_CONTAINER,
} from "../../utils/Const";
import { FirebaseDataModel } from "../../models";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export class FirebaseService {
    private static db: FirebaseFirestore;

    public static init() {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore(firebaseApp);
    }

    public static async cacheData(documentId: string, firebaseData: FirebaseDataModel) {
        let data = Object.assign({}, firebaseData).data;
        let i = 0;
        while (data.length) {
            let dataToSend = data.splice(0, 1000);

            await this.db
                .collection(CACHED_CONTAINER)
                .doc(`${documentId}${i > 0 ? i : ""}`)
                .set({ data: dataToSend, nextPage: dataToSend.length < 1000 ? false : true, sendDate: Date.now() });
            i = i + 1;
        }
    }

    public static async downloadLatestData(documentId: string) {
        let firebaseData = null;
        let data: any[] = [];
        let i = 0;
        do {
            firebaseData = await (
                await this.db
                    .collection(CACHED_CONTAINER)
                    .doc(`${documentId}${i > 0 ? i : ""}`)
                    .get()
            ).data();

            data.push(...firebaseData?.data);

            i = i + 1;
        } while (firebaseData?.nextPage);

        return { sendDate: firebaseData?.sendDate, nextPage: firebaseData?.nextPage, data };
    }

    public static async clearData() {
        const emptyData: FirebaseDataModel = { data: [], sendDate: 0, nextPage: false };
        await this.db.collection(CACHED_CONTAINER).doc(STOCK_MARKET_CONTAINER).set(emptyData);
        await this.db.collection(CACHED_CONTAINER).doc(CRYPTOCURRENCIES_CONTAINER).set(emptyData);
        await this.db.collection(CACHED_CONTAINER).doc(CURRENCIES_CONTAINER).set(emptyData);
        await this.db.collection(CACHED_CONTAINER).doc(ETF_CONTAINER).set(emptyData);
    }
}
