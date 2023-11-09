const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ToDoAppDB',
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err) => {
    if(!err) console.log('Connected to DB');
    else throw err;
});

module.exports = mongoose;