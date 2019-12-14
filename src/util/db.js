"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const level = require("level");
// localStorage.setItem("Hello", "World")
// console.log(localStorage.getItem("Hello"))
let db = level("level-db");
class Storage {
    async query() {
        let retData = new Array();
        return new Promise(resolve => {
            db.createReadStream({ keys: true, values: true })
                .on('data', function (data) {
                console.log(data.key);
                retData.push(JSON.parse(data["value"]));
            })
                .on('end', () => {
                console.log("End");
                resolve(JSON.stringify(retData));
            });
        });
    }
    async queryWithKey(keyName) {
        let retData = new Array();
        return new Promise(resolve => {
            db.createReadStream({ keys: true, values: true, gte: keyName, lte: `${keyName}-9` })
                .on('data', function (data) {
                console.log(data.key);
                retData.push(JSON.parse(data["value"]));
            })
                .on('end', () => {
                console.log("End");
                resolve(JSON.stringify(retData));
            });
        });
    }
    async getData(key) {
        return new Promise(resolve => {
            db.get(key, function (err, value) {
                if (value === undefined) {
                    resolve(JSON.stringify({ "state": "not-defined" }));
                }
                else {
                    resolve(value);
                }
            });
        });
    }
    putData(key, value) {
        db.put(`${key}-${new Date().getTime()}`, value, (err) => {
            if (err)
                return console.log("Ooops!", err);
        });
        db.put(`${key}-latest`, value, (err) => {
            if (err)
                return console.log("Ooops!", err);
        });
    }
    clear() {
        db.clear();
    }
}
exports.default = Storage;
// (async function main(){
//     // console.log(new Date().getTime())
//     await db.clear()
//     await putData()
//     // await db.clear();
//     // getData()
//     query()
// })();
