require('dotenv').config();
const express = require('express');
var cors = require('cors');

const app = express();
const routes = require('./src/routes');
app.use(cors());
app.use(express.json());

app.use('/auth', routes);

const PORT = 3004;
app.listen(PORT, (error)=>{
    if(!error)
    console.log(`App is listening on ${PORT}` );
    else
    console.log('Error occured', error);
})

