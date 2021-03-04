const mongoose = require('mongoose')

const MONGODB_URL = "mongodb+srv://deepak:deepakdb@cluster0.rkpgm.mongodb.net/haritask?authSource=admin&replicaSet=atlas-fsfmgw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then (() => {
    console.log('db connected')
}).catch(() => {
    console.log('db not connected')
})