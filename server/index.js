const express=require('express');
const path=require('path');
const cluster=require('cluster');
const numCPUs=require('os').cpus().length;

let bodyParser=require('body-parser');
let mongoose=require('mongoose');
let verifyToken=require('./validate-token');
const cors = require('cors');
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
require('dotenv').config()


const isDev=process.env.NODE_ENV !== 'production';
const PORT=process.env.PORT || 5000;

if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  for (let i=0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app=express();

  let apiRoutes=require("./api-routes");
  let privateApiRoutes=require("./private-api-routes");
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  const uri = `mongodb://walmartul:${process.env.PASSWORD}@cluster0-shard-00-00.cfgvv.mongodb.net:27017,cluster0-shard-00-01.cfgvv.mongodb.net:27017,cluster0-shard-00-02.cfgvv.mongodb.net:27017/${process.env.DBNAME}?ssl=true&replicaSet=atlas-6cgmnp-shard-0&authSource=admin&retryWrites=true&w=majority`
  // const uri=`mongodb+srv://${process.env.ATLASUSER}:${process.env.PASSWORD}@cluster0.cfgvv.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
  mongoose.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true},
  )
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))

  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  app.use('/api', apiRoutes);
  app.use('/api', verifyToken, privateApiRoutes);

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
  });
}
