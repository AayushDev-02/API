const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const https = require('https');
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

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/a0705c742c";

    const option = {
        method: "POST",
        auth: "aayush02:55fb3f22a680fe6f7a9c396162bbe418-us21"
    }


    const request = https.request(url, option, (response) =>{
        response.on("data", (data) =>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


})



app.listen(port, (req,res) =>{
    console.log("App listed at port: " + port);
})

// const API_KEY = "55fb3f22a680fe6f7a9c396162bbe418-us21";
// const List_ID = "a0705c742c";