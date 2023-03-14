const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get('/' , (req,res) =>{
    res.sendFile(__dirname + '/signup.html')
})

app.post('/' , (req,res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    res.send();

    res.sendFile(__dirname + 'success.html')
})



app.listen(port, (req,res) =>{
    console.log("App listed at port: " + port);
})

const API_KEY = "55fb3f22a680fe6f7a9c396162bbe418-us21";
const List_ID = "a0705c742c";