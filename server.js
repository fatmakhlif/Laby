import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config()
import 'express-async-errors'
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import labRouter from './routes/labRouters.js'
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
// import { Routes } from 'react-router-dom';
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/lab', labRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`the server is listening on ${port}...`)
        });
    }
    catch (error) {
        console.log(error)
    }
}
start()
