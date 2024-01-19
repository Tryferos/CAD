import { initializeApp } from "firebase/app";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};


const app = initializeApp(firebaseConfig);
const db = getStorage(app);


export async function uploadImage(url: Blob | Uint8Array | ArrayBuffer, name: string) {
    const storageRef = ref(db, 'images/' + name);
    const uploadTask = uploadBytesResumable(storageRef, url)
    const path: string = await new Promise(async (res, rej) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percentUploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            (err) => (rej(err)),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
                    res(url)
                })
            }
        )
    })
    return path;
}
