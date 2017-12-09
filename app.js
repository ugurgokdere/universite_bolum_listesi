const express = require("express");
const {Bolum,Okul} = require('./db')

let app = express();
app.set('json spaces' ,3)

app.get('/api/okullar',async (req,res) =>{
    let count = await Okul.query().count();
    let okullar = await Okul.query();
    okullar = okullar.map(o =>Object.assign({},o,{bolumler:`/api/okullar/${o.kod}/bolumler`}));
    res.status(200).json({meta:count[0], okullar});
})

app.get('/api/okullar/:okulKod/bolumler',async (req,res) =>{
    
    let okul = await Okul.query().findOne({kod:req.params.okulKod});
    let count = await Bolum.query()
    .where('okulKod','=',okul.kod)
    .count();
    let bolumler = await Bolum.query()
    .where('okulKod','=',okul.kod)
    res.status(200).json({okul,meta:count[0], bolumler});
})

app.get('/api/bolumler',async (req,res) =>{
    let count = await Bolum.query().count();
    let bolumler = await Bolum.query();
    res.status(200).json({meta:count[0], bolumler});
})
app.use("/api/export", (req,res) =>{
    let db =`${__dirname}/yokOkulListe.db`;
    res.sendFile(db);
})

app.use("*", (req,res) =>{
    let html =`${__dirname}/index.html`;
    res.sendFile(html);
})


app.listen(3000, ()=> console.log("uygulama , http://localhost:3000  adresinde calisiyor..."))