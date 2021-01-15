const mongoose = require('mongoose') ;

const URI = 'mongodb://localhost/mern-tasks'

const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

mongoose.connect(URI, config)
    .then( db => console.log('DB is connected'))
    .catch( err => console.error(err))

module.exports = mongoose