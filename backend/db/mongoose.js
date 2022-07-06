//Load mongoose
const mongoose = require('mongoose');

//Load database URL from the environment variables
const dbURL = "mongodb+srv://karansaraswat2:karan3015@cluster0.nnzew.mongodb.net/LotteryDB";

//This method will be invoked in the index.js file
module.exports = function(app){

  //Connect to the database URL using mongoose.
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).catch(e => {
    console.log('An error occured with the mongoose connection: ',e.message) //Throw an error if something occurs
  })

  //Mongoose event listeners

  //Once the connection is open emit the express app emits ready
  mongoose.connection.once('open', function(){
    console.log("Mongoose default connection is open to ", dbURL)
    app.emit('ready'); // Event emitter. It triggers starting of the server.
  })

  //When the connection gets disconnected
  mongoose.connection.on('disconnected', function(){
      console.log("Mongoose connection is disconnected");
  });

  //Graceful closing of connection in case of process exit
  process.on('SIGINT', function(){
      mongoose.connection.close(function(){
          console.log("Mongoose default connection is disconnected due to application termination");
          process.exit(0)
      });
  });
}