import { MY_KEY, SIGNATURE_KEY } from "@core/constants";
import CryptoJS from "crypto-js";

export class cryptoJSHelp {
  static hashBodyValue(body) {
    let keyBody;
    const sha = CryptoJS.algo.SHA1.create();
    sha.update(MY_KEY);
    const hash = sha.finalize();
    const key = hash.words.slice(0, 4);
    if (body && Object.keys(body).length > 0) {
      keyBody = JSON.stringify(body);
    } else {
      keyBody = "";
    }
    return CryptoJS.AES.encrypt(keyBody, CryptoJS.lib.WordArray.create(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }
  static hashBodyValuePass(body) {
    let keyBody;
    const sha = CryptoJS.algo.SHA1.create();
    sha.update(MY_KEY);
    const hash = sha.finalize();
    const key = hash.words.slice(0, 4);
    if (body) {
      keyBody = body;
    } else {
      keyBody = "";
    }
    return CryptoJS.AES.encrypt(keyBody, CryptoJS.lib.WordArray.create(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }
  static hashValue(body: any, token?: string): string {
    let hashValue;
    if (body && Object.keys(body).length > 0) {
      hashValue = JSON.stringify(body) + (token ? token : "");
    } else {
      hashValue = token ? token : "";
    }
    return CryptoJS.HmacSHA256(hashValue, SIGNATURE_KEY).toString(
      CryptoJS.enc.Base64
    );
  }

  static decryptHashedValue(encryptedValue) {
    const sha = CryptoJS.algo.SHA1.create();
    sha.update(MY_KEY);
    const hash = sha.finalize();
    const key = hash.words.slice(0, 4);
  
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, CryptoJS.lib.WordArray.create(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
  
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }  
}
