//require express
const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');//store the secret 

const app = express();



//files to use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname+ '/public/controller'))
app.use('/node_modules', express.static(__dirname + '/node_modules'));


app.get('*', (req,res)=>{

    //send html file
    res.sendFile(__dirname + "/public/controller/controller.html")
});

//define port
const port = process.env.PORT || 5000

//listen to port
app.listen(port, () => console.log('listening on port ' + port)); 