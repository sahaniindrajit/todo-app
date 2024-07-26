import express from 'express';
import { mongoose } from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import router from './route.js';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser())
app.use('/user', router)

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("mongodb connected")

    }
    catch (e) {
        console.log(e)
        process.exit(1);
    }
}

app.listen(PORT, () => {
    ConnectDB()
    console.log(`server is running at port ${PORT}`)
})
