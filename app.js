const express = require("express")
const axios = require("axios")
const app = express()
const port = 8080

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get("/verify/:number", async function(req, res) {
  try {
    const API_ACC_KEY = "uI85ZOfCikk18WJV20STZDNfZKBhw66V";

    const approval = await axios.get(
      `http://apilayer.net/api/validate?access_key=${API_ACC_KEY}&number=${req.params.number}&country_code=&format=1`    
    );

    res.render("numverify", { verify: approval.data });  
      
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);      
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
});

app.get('/', (req, res) => res.send('Index Page - Numverify API + APILayer.com'))


app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.listen(port, () => console.log(`Running on ${port} port`))
