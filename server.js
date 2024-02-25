import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
//useUnifiedTopology: true
 } )
.then(() => {
    console.log("Connected to the database!");
    })
    
mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})
app.get("/", (req, res) => {
res.json({"message":"Welcome to DressStore application."});
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server for market place started on port %s.', config.port) 
})
