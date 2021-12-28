const express = require('express')
const app = express();

const dotenv = require('dotenv')
const connect = require('./config/db');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin')
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const PORT = process.env.PORT || 5000


dotenv.config()
// Connecting Database
connect()

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Acess-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST ,PATCH,DELETE, GET')
        return res.status(200).json({});
    }
    next();
})
app.use('/api/user', userRouter)
app.use('/api/admin' , adminRouter)
app.use(notFound)
app.use(errorHandler)

// Creating a server at localhost 3000
app.listen(PORT, () => {
    console.log(`The server started at http://localhost:${PORT}`)
})
