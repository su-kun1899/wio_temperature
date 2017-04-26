'use strict';

const axios = require('axios');
const TOKEN = process.argv[2] || '';
const BASE_PATH = `https://us.wio.seeed.io/v1/node`; // 自身のものをアプリで確認

/**
 * 温度取得
 */
 const getTemp = () => {
     const ENDPOINT = `/GroveTempA0/temp`;
     const BASE_URL = `${BASE_PATH}${ENDPOINT}?access_token=${TOKEN}`;
     return axios.request({method: 'get', baseURL: BASE_URL}); // ここでは実行しない
 }

/**
 * 温度情報を文字列変換+Cを追加
 * @param {number} temp
 * @return {string}
 */
const temp2digit = (temp) =>{
    let temp_str = `${temp}`;
    temp_str = temp_str.replace('.','');
    if(temp_str.length >= 4){
        temp_str = temp_str.substr(0,temp_str.length-1);
    }
    return `${temp_str}C`;
}

async function main(){ // async/awaitを使う
   const res = await getTemp();
   const temp = res.data.temperature;
   const text = temp2digit(temp);
   console.log(text);
}

main();