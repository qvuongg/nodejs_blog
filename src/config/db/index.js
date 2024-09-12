const mongoose = require('mongoose');

async function connect(){

    try{
        await mongoose.connect('mongodb://localhost:27017/BK_Insights', {
    });
    console.log('Connected to MongoDB');
} catch (error){
    console.log('Connect failure');
}}

module.exports = {connect};