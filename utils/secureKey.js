import CryptoJS from "crypto-js"

const {SANITY_STUDIO_SECRET_KEY} = process.env

export const decryptKey = (cipherText) => {
    let bytes = CryptoJS.AES.decrypt(cipherText, SANITY_STUDIO_SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
}