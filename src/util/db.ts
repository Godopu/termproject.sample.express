const level = require("level")
import express from "express";
// localStorage.setItem("Hello", "World")
// console.log(localStorage.getItem("Hello"))

let db = level("level-db")

export default class Storage {
    public async query(): Promise<string> {
        let retData = new Array<object>();
        return new Promise(resolve => {
            db.createReadStream({ keys: true, values: true })
                .on('data', function (data: any) {
                    console.log(data.key)
                    retData.push(JSON.parse(data["value"]))
                })
                .on('end', () => {
                    console.log("End")
                    resolve(JSON.stringify(retData))
                })
        })
    }

    public async queryWithKey(keyName : string): Promise<string> {
        let retData = new Array<object>();
        return new Promise(resolve => {
            db.createReadStream({ keys: true, values: true, gte : keyName, lte : `${keyName}-9`})
                .on('data', function (data: any) {
                    console.log(data.key)
                    retData.push(JSON.parse(data["value"]))
                })
                .on('end', () => {
                    console.log("End")
                    resolve(JSON.stringify(retData))
                })
        })
    }

    public async getData(key: string): Promise<string> {
        return new Promise(resolve => {
            db.get(key, function (err: Error, value: any) {
                if(value === undefined){
                    resolve(JSON.stringify({"state" : "not-defined"}))
                }else{
                    resolve(value)
                }
                
            })
        })
    }

    public putData(key: string, value: string) {
        db.put(`${key}-${new Date().getTime()}`, value, (err: Error) => {
            if (err) return console.log("Ooops!", err)
        })

        db.put(`${key}-latest`, value, (err: Error) => {
            if (err) return console.log("Ooops!", err)
        })
    }

    public clear(){
        db.clear();
    }
}


// (async function main(){
//     // console.log(new Date().getTime())
//     await db.clear()
//     await putData()
//     // await db.clear();
//     // getData()
//     query()

// })();