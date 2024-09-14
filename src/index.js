//npm start: web server cua nodejs
//npm run watch
const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const path = require("path");
const dotenv = require('dotenv');
const helmet = require('helmet');
const cloudinary = require('cloudinary').v2;
const methodOverride = require('method-override')





const SortMiddleware = require('./app/middlewares/SortMiddleware')
const CryptoPriceMiddleware = require('./app/middlewares/CryptoPriceMiddleware');
const SetUserInfo = require('./app/middlewares/SetUserInfo');

const route = require("./routes");
const db = require("./config/db");

//env config
dotenv.config();

//connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
//app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//

//Clouddinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(methodOverride('_method'))
// Cấu hình session
app.use(session({
    secret: 'secret', // Bạn nên thay đổi secret này
    resave: false,
    saveUninitialized: true,
}));

// Cấu hình connect-flash
app.use(flash());

// Sử dụng cookie-parser middleware
app.use(cookieParser());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "https://res.cloudinary.com"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"]
    }
}));

app.use(express.json({ limit: "5mb" }));


//custom middleware
app.use(CryptoPriceMiddleware);
app.use(SortMiddleware);
app.use(SetUserInfo);




//Template engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: require('./helpers/handlebars')
    }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'resources', 'views'));

//Route init
route(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

