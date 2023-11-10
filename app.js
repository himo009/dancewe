const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true});

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

var contactSchema = new mongoose.Schema({
    name: String,
    dateofbirth: String,
    phone: String,
    email: String,
    address: String
  });
var Contact= mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({extended: true}));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
       myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
       res.status(400).send("item was not saved to the databse")
})
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});