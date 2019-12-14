import { Router } from "express";
import Storage from "../util/db"

const router = Router();
const db = new Storage();
/* GET home page. */

router.get('/door-latest', async function(req, res, next){
    let result = await db.getData("door-latest")
    let obj = JSON.parse(result);
    if(obj["state"] === "not-defined")
        obj["state"] = "close"
    res.send(JSON.stringify(obj))
});

router.get('/door-query', async function (req, res, next) {
    res.send(await db.queryWithKey("door"));
});

router.put('/door', function(req, res, next){
    let obj = req.body;

    obj["timestamp"] = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Seoul'
    });

    db.putData("door", JSON.stringify(obj))    

    res.send("OK");
})

router.get('/led-latest', async function(req, res, next){
    let result = await db.getData("led-latest")
    let obj = JSON.parse(result);
    if(obj["state"] === "not-defined")
        obj["state"] = "off"
    res.send(JSON.stringify(obj))
});

router.get('/led-query', async function (req, res, next) {
    res.send(await db.queryWithKey("led"));
});

router.put('/led', function(req, res, next){
    let obj = req.body;

    obj["timestamp"] = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Seoul'
    });

    db.putData("led", JSON.stringify(obj))    
    res.send("OK");
})

router.put('/clear', function(req, res, next){
    db.clear()

    res.send("OK");
})

router.get('/queryall', async function (req, res, next) {
    res.send(await db.query());
});

router.put('/temp', function(req, res, next){
    let obj = req.body;

    obj["timestamp"] = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Seoul'
    });

    db.putData("temp", JSON.stringify(obj))    

    res.send("OK");
})

router.get('/temp-latest', async function (req, res, next) {
    let result = await db.getData("temp-latest")
    res.send(result)
});

router.get('/temp-query', async function (req, res, next) {
    res.send(await db.queryWithKey("temp"));
});

module.exports = router;

