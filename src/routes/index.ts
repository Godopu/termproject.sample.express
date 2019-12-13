import { Router } from "express";
import Storage from "../util/db"

const router = Router();
const db = new Storage();
/* GET home page. */

router.get('/door-latest', async function(req, res, next){
    let result = await db.getData("door-latest")
    res.send(result)
});

router.put('/clear', function(req, res, next){
    db.clear()

    res.send("OK");
})

router.put('/door', function(req, res, next){
    let obj = req.body;

    obj["timestamp"] = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Seoul'
    });

    db.putData("door", JSON.stringify(obj))    

    res.send("OK");
})

router.get('/queryall', async function (req, res, next) {
    res.send(await db.query());
});

router.put('/device1', function (req, res, next) {
    db.putData("device", JSON.stringify(req.body));
    res.send("OK");
});

router.get('/device1-latest', async function (req, res, next) {
    res.send(await db.query());
});

router.get('/device1-query', async function (req, res, next) {
    res.send(await db.query());
});

module.exports = router;

