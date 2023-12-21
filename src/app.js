require('dotenv').config();
const express           = require('express');
const cookieParser      = require('cookie-parser')

const app               = express();
const config            = require('./config/config'); 
const cors              = require('cors');
const http_middleware   = require('./system/middlewares/Http_Middleware').get_http;
const error_middleware  = require('./system/middlewares/Error_Middleware');

//mongo database
const connectDb         = require('./config/db');
connectDb();

//env
const FRONTEND_URL      = process.env.FRONTEND_URL;

//json
app.use(express.json());

//cookie
app.use(cookieParser());

//cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

const corsOption = {
    origin: FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOption));
app.use(express.urlencoded({extended: false}))

//routes
const usersRoutes       = require('./routes/users.routes');
const productsRoutes    = require('./routes/products.routes');

app.use('/api/users', http_middleware, usersRoutes);
app.use('/api/products', http_middleware, productsRoutes);

//error middleware
app.use(error_middleware);

app.listen(config.PORT, () => {
    console.log(`Server is running at port ${config.PORT}`);
});