const mongoose = require('mongoose');

const url = 'mongodb+srv://in_hacke_r:MoNgOdB0987@cluster0.3uoai5t.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url).then((result) => {
    console.log('server connected');
}).catch((err) => {
    console.error('err');
});

module.exports = mongoose;