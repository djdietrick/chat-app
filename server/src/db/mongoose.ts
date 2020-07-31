import * as mongoose from 'mongoose';

async function connectToDb() {
    await mongoose.connect(process.env.DEV_MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).catch((err) => {
        console.log("Error connecting to database: ", err);
    })
    console.log("Successfully connected to database");
}

connectToDb();
