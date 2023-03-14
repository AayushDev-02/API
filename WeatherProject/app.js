const express = require("express")
const bodyParser = require("body-parser")
const https = require("https");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")

})

app.post('/', (req, res) => {
    

    const city = req.body.cityName;
    const API_KEY = "435e360c3a53eb95401a2bc6f1a7b153";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
    https.get(url, (response) => {
        console.log(response)

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
            res.write("<h1>The temp in " + city + " is : " + temp + " degree Celcius </h1>")
            res.write("<p>The weather currently is " + desc + "</p>")
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })

})





app.listen(port, () => {
    console.log("Server running at post" + port);
})