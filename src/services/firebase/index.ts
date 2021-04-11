
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseFirestore } from '@firebase/firestore-types'
import { CACHED_CONTAINER } from "../../utils/Const";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export class FirebaseService {
    private static db: FirebaseFirestore;

    public static init() {
        const firebaseApp = firebase.initializeApp(firebaseConfig)
        this.db = firebase.firestore(firebaseApp);
    }

    public static async cacheData(documentId: string, firebaseData: any) {
        await this.db.collection(CACHED_CONTAINER).doc(documentId).set(firebaseData);
    }

    public static async downloadLatestData(documentId: string) {
        let data: any = await this.db.collection(CACHED_CONTAINER).doc(documentId).get();
        return data.data();
    }

}