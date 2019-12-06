import Vue from 'vue'
import CryptoJS from 'crypto-js'

export default{
    md5(text){
        return CryptoJS.MD5(text).toString();
    }
}
