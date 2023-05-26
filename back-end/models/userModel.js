const {Schema, model, Types} = require('../connection');

const myschema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = model('user', myschema);