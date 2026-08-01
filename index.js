import { config } from 'dotenv'
import express from 'express'
import dbConnection from './Src/configs/dbConnection.js';
import { errorMiddleware } from './Src/middlewares/errorMiddleware.js';
import allRoutes from './Src/routes/index.js';
config();
dbConnection();

const app = express()
app.use(express.json());

app.post('/', (req, res) => {
    res.send('Hello, World!, this is the index file...')
})

app.use("/api", allRoutes)

app.use(errorMiddleware)


app.listen(3500, () => {
    console.log('Server is running on port http://localhost:3500')
})