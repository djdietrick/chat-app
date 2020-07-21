import * as mongoose from 'mongoose';

mongoose.connect(process.env.DEV_MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    //console.log("Successfully connected to database");
}).catch((err) => {
    console.log("Error connecting to database: ", err);
})